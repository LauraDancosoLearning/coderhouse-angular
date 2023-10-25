import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'top-students-modal',
  templateUrl: './top-students-modal.component.html',
  styleUrls: ['./top-students-modal.component.scss']
})
export class TopStudentsModalComponent {
  constructor(private matDialogRef: MatDialogRef<TopStudentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public top: number,
    private studentsService: StudentsService){
      
    }
}
