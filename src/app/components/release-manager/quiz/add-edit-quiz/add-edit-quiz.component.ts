import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { PropositionService } from 'src/app/services/proposition.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SharedChapitreService } from 'src/app/services/shared-chapitre.service';

@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {
  isLoading: boolean = false;
  quizForm!: FormGroup;
  quizData: any;

  constructor(
    public dialogRef: MatDialogRef<AddEditQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private propositionService: PropositionService,
    private sharedChapitreService: SharedChapitreService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.quizData = this.data;
      this.quizForm = this.formBuilder.group({
        question: [this.quizData.quiz.question, Validators.required],
        propositions: this.formBuilder.array([])
      });
      if (this.quizData.propositions) {
        this.quizData.propositions.forEach((proposition: any) => {
          this.addProposition(proposition);
        });
      }
    } else {
      this.initializeForm();
    }
  }


  initializeForm(): void {
    this.quizForm = this.formBuilder.group({
      question: ['', Validators.required],
      propositions: this.formBuilder.array([])
    });

    if (this.quizData?.propositions) {
      this.quizData.propositions.forEach((proposition: any) => {
        this.addProposition(proposition);
      });
    }
  }

  get propositionControls(): FormArray {
    return this.quizForm.get('propositions') as FormArray;
  }

  addProposition(proposition?: any): void {
    const propositionGroup = this.formBuilder.group({
      id: [proposition?.id || null],
      response: [proposition?.response || '', Validators.required],
      correcte: [proposition?.correcte || false]
    });

    this.propositionControls.push(propositionGroup);
  }

  removeProposition(index: number): void {
    if (this.data && (this.quizForm.value.propositions[index].id > 0)) {
      const idProposal = +this.quizForm.value.propositions[index].id;
      this.openConfirmationDialog(idProposal, index);
    } else {
      this.propositionControls.removeAt(index);
    }
  }

  openConfirmationDialog(id: number, index: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // call method delete
        this.propositionService.deleteProposition(id, this.data.quiz.id).subscribe(
          data => {
            this.propositionControls.removeAt(index);
            console.log("proposal deleted.");
          }
        )
      }
    });
  }

  submitQuiz(): void {
    this.isLoading = true;
    const chapitreId = this.sharedChapitreService.chapitreId;
    const quizQuestion = this.quizForm.value.question;
    const proposals = this.quizForm.value.propositions;
    if (this.quizForm.invalid) {
      return;
    }

    const quizId = this.quizData ? this.quizData.quiz.id : null;
    const quizData = {
      quiz: {
        id: quizId,
        question: this.quizForm.value.question
      },
      propositions: this.quizForm.value.propositions
    };

    if (quizId) {
      if (this.quizData.quiz.question !== quizQuestion) {
        const theQuiz = {
          question: quizQuestion
        }
        this.quizService.updateQuiz(chapitreId, this.data.quiz.id, theQuiz).subscribe({
          next: (res) => {
            setTimeout(() => {
              this.isLoading = false;
              console.log("Quiz updated");
              this._snackBar.open('Quiz updated successfully.', '', {
                duration: 3000,
                panelClass: ['green-snackbar'],
              });
              this.dialogRef.close(true);
            }, 1000);
          },
          error: (err) => {
            setTimeout(() => {
              this.isLoading = false;
              this._snackBar.open('Quiz update unsuccessful.', '', {
                duration: 3000,
                panelClass: ['red-snackbar'],
              });
            }, 1000);
          }
        }
        )
      }

      proposals.forEach((proposal: any) => {
        if (!(proposal.id > 0)) {
          this.propositionService.addProposition(quizId, proposal).subscribe({
            next: (res) => {
              setTimeout(() => {
                this.isLoading = false;
                console.log("Proposal added");
                this._snackBar.open('Prospal added successfully.', '', {
                  duration: 3000,
                  panelClass: ['green-snackbar'],
                });
                this.dialogRef.close(true);
              }, 1000);
            },
            error: (err) => {
              setTimeout(() => {
                this.isLoading = false;
                this._snackBar.open('Prospal addition unsuccessful.', '', {
                  duration: 3000,
                  panelClass: ['red-snackbar'],
                });
              }, 1000);
            }
          }
          )
        } else {
          const element = this.quizData.propositions.find((propo: { id: number; response: string; correcte: boolean; }) => propo.id === proposal.id);
          if ((proposal.correcte !== element.correcte) || (proposal.response !== element.response)) {
            this.propositionService.updateProposition(element.id, quizId, proposal).subscribe({
              next: (res) => {
                setTimeout(() => {
                  this.isLoading = false;
                  console.log("Proposal updated");
                  this._snackBar.open('Prospal updated successfully.', '', {
                    duration: 3000,
                    panelClass: ['green-snackbar'],
                  });
                  this.dialogRef.close(true);
                }, 1000);
              },
              error: (err) => {
                setTimeout(() => {
                  this.isLoading = false;
                  this._snackBar.open('Prospal update unsuccessful.', '', {
                    duration: 3000,
                    panelClass: ['red-snackbar'],
                  });
                }, 1000);
              }
            }
            )
          }
        }
      });

    } else {
      this.quizService.addQuizwithProposition(quizData, chapitreId).subscribe(
        data => {
          setTimeout(() => {
            this.isLoading = false;
            console.log('Quiz added');
            this._snackBar.open('Quiz added successfully.', '', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });
            this.dialogRef.close(true);
          }, 1000);
        },
        error => {
          setTimeout(() => {
            this.isLoading = false;
            console.log(error);
            this._snackBar.open('Quiz addition unsuccessful.', '', {
              duration: 3000,
              panelClass: ['red-snackbar'],
            });
          }, 1000);
        }
      );
    }
  }
}
