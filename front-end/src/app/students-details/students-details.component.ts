import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StudentsService } from '../service/students.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {
 _id:any='';

  constructor(
    private location:Location,
    private builder: FormBuilder,
    private studentService:StudentsService,
    private snackBar: MatSnackBar,
    private activatedRoute:ActivatedRoute,
  ) { }

  studentDetailsForm = this.builder.group({
    studentName:this.builder.control('',Validators.required),
    rollNumber:this.builder.control('',Validators.required),
    subject1:this.builder.control('',Validators.required),
    subject2:this.builder.control('',Validators.required),
    subject3:this.builder.control('',Validators.required),


  });
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('_id')){
      this._id = this.activatedRoute.snapshot.paramMap.get('_id')
      this.studentService.findOne(this._id).subscribe(
          response =>{
            this.studentDetailsForm.get('studentName')?.setValue(response.studentName);
            this.studentDetailsForm.get('rollNumber')?.setValue(response.rollNumber);
            this.studentDetailsForm.get('subject1')?.setValue(response.subject1);
            this.studentDetailsForm.get('subject2')?.setValue(response.subject2);
            this.studentDetailsForm.get('subject3')?.setValue(response.subject3);

          },
          error=>{
            console.log(error);
          }
      )
    }
  }

  submitClicked(){

    if(this._id==""){
      this.studentService.create(this.studentDetailsForm.getRawValue()).subscribe(
        response =>{
          this.showMessage('Students Details Saved')
          this.location.back()
        },
        error=>{
          this.showError('Error Saving Details')
        }
      )

    }else{
      this.studentService.findOneAndUpdate(this._id,this.studentDetailsForm.getRawValue()).subscribe(
        response =>{
          this.showMessage('Students Details Saved')
          this.location.back();
        },
        error=>{
          this.showError('Error Saving Students Details')
        }
      )
    }
    

  }

  backButtonClicked(){
    this.location.back()
  }
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Info',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }


}
