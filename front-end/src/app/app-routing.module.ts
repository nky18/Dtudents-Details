import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  {path:'',component:StudentsListComponent},
  {path:'studentslists',component:StudentsListComponent},
  {path:'studentdetails',component:StudentsDetailsComponent},
  {path:'studentdetails/:_id',component:StudentsDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
