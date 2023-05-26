import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{server} from '../config'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private http:HttpClient
  ) { }

  create(studentsDetailsData:any){
     return this.http.post<any>(`${server}studentsdetails`,studentsDetailsData)
  }
  findOne(_id: any){
     return this.http.get<any>(`${server}studentsdetails/${_id}`)
  }
  findAll(){
     return this.http.get<any[]>(`${server}studentsdetails`)
  }
  findOneAndUpdate(_id: any,studentsDetailsData: any){
     return this.http.put<any>(`${server}studentsdetails/${_id}`,studentsDetailsData)
  }
  delete(_id: any){
   return this.http.delete<any>(`${server}studentsdetails/delete/${_id}`)
  }

}
