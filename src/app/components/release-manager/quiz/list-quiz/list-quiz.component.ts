import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizDTO } from 'src/app/common/quiz-dto';
import { QuizService } from 'src/app/services/quiz.service';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';
import { SharedChapitreService } from 'src/app/services/shared-chapitre.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  isLoading: boolean = false;
  quizDto: QuizDTO[] = [];
  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private sharedChapitreService: SharedChapitreService,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listQuiz();
    });
  }

  listQuiz() {
    const chapitreId = +this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizWithProspal(chapitreId).subscribe(
      data => {
        this.quizDto = data;
        //console.log(data);
      }
    )
  }

  openAddQuizModal(): void {
    this.sharedChapitreService.chapitreId = +this.route.snapshot.paramMap.get('id')!;
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listQuiz();
      }
      else {
        console.log(result);
      }
    });
  }

  openConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteQuiz(id);
      }
    });
  }

  deleteQuiz(id: number) {
    this.isLoading = true;
    const chapitreId = +this.route.snapshot.paramMap.get('id')!;
    this.quizService.deleteQuizwithProposal(id, chapitreId).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.listQuiz();
          this._snackBar.open('Quiz deleted successfully.', '', {
            duration: 3000,
            panelClass: ['green-snackbar'],
          });
        }, 1000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;
          this._snackBar.open('Not deleted Quiz.', '', {
            duration: 3000,
            panelClass: ['red-snackbar'],
          });
        }, 1000);
      } 
    })
  }

  openEditQuizModal(data: any): void {
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      width: '540px',
      data,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listQuiz();
      }
      else {
        console.log(result);
      }
    });
  }

}
