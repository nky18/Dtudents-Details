import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentsService } from '../service/students.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  displayedColumns=['serialNumber','studentName','rollNumber','subject1','subject2','subject3','total','edit','delete']
  dataSource = new  MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;    
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private location:Location,
    private router:Router,
    private snackBar:MatSnackBar,    
    private dialog:MatDialog ,
    private studentService:StudentsService 

  ) { }

  ngOnInit(): void {
    this.studentService.findAll().subscribe(
      response=>{
        this.dataSource.data = response;
        this.dataSource._updateChangeSubscription()
      },
      error=>{
        this.showError('Error reading Students Details')        
      }
    )
  }

  calculateTotal(template: any): number {
    const subject1 = Number(template.subject1);
    const subject2 = Number(template.subject2);
    const subject3 = Number(template.subject3);
    return subject1 + subject2 + subject3;
  }
  

  
  addButtonClicked(){
    this.router.navigate(['studentdetails']);
  }
  backButtonClicked(){
    this.location.back();
  }
  editButtonClicked(studentsDetailsData:any){
     this.router.navigate([`studentdetails/${studentsDetailsData._id}`]);
  }
   deleteButtonClicked(studentsDetailsData:any){
    const deleteDialog = this.dialog.open(DeleteConfirmationDialogComponent,{
      width:'400px',data:{message:`Are you sure that you want to delete the Standard Verbiage ${studentsDetailsData.studentName} ?`}
    });
    deleteDialog.afterClosed().subscribe(result=>{
      if(result.event=='confirmed'){
        this.deleteStudentDetails(studentsDetailsData);   
      }
    })    
  }
  deleteStudentDetails(studentsDetailsData:any){
    this.studentService.delete(studentsDetailsData._id).subscribe(
      response => {
        this.showMessage('Student Details Deleted');
        this.studentService.findAll().subscribe(
          responseData => {
            this.dataSource.data = responseData;
            // Optionally, you can also trigger the change detection manually
            this.dataSource._updateChangeSubscription();
          },
          error => {
            this.showError('Error reading Students Details');
          }
        );
      },
      error => {
        this.showError('Error Deleting Student Details');
      }
    );   
  }
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  
  showError(msg: string){
    this.snackBar.open(msg,'Error',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
  showMessage(msg: string){
    this.snackBar.open(msg,'Message',{duration:4000,horizontalPosition:'end',verticalPosition:'top'})
  }
}
