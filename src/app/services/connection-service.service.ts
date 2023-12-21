import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient) { }

  getEmployees(){
    return  this.http.get<any>(`${environment.urlApiEmployees}`)
  }

  getEmployeeById(id:number){
    return  this.http.get<any>(`${environment.urlApiEmployeeById}`+id)
  }
}