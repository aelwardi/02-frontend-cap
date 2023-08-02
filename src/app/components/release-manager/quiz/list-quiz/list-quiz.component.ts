import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizDTO } from 'src/app/common/quiz-dto';
import { QuizService } from 'src/app/services/quiz.service';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';
import { ConfirmDialogComponent } from 'src/app/components/release-super-admin/departement/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  quizDto: QuizDTO[] = [];
  chapitreId: number = 7;
  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listQuiz();
    });
  }

  listQuiz() {
    this.quizService.getQuizWithProspal(this.chapitreId).subscribe(
      data => {
        this.quizDto = data;
        console.log(data);
      }
    )
  }

  openAddQuizModal(): void {

    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      width: '540px'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
        // call method delete
        this.deleteQuiz(id);
      }
    });
  }

  deleteQuiz(id: number) {
    this.quizService.deleteQuizwithProposal(id, this.chapitreId).subscribe({
      next: (res) => {
        this.listQuiz();
      },
      error: console.log,
    })
  }

  openEditQuizModal(data: any): void {
    this.dialog.open(AddEditQuizComponent, {
      width: '540px',
      data,
    })
  }

}
