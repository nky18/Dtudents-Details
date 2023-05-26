import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'students-details';

  constructor(
   
    private router:Router,
   

  ) { }

  navigateToStudentsList(){
    this.router.navigate(['studentslists']);
  }
}
