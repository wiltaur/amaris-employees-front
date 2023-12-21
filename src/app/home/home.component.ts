import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection-service.service';
import { Employee } from '../models/employee.model';
import * as $ from 'jquery';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notEmployee: boolean = false
  employees!: Observable<Employee[]>;
  selectedEmployee: any
  idEmployee!: number
  titleAlert!: string
  bodyAlert!: string

  constructor(private _conenectedService: ConnectionService) { }

  ngOnInit(): void {
    this._conenectedService.getEmployees().subscribe(data => {
      if(data.status === "success")
        this.employees = of(data.data)
      this.titleAlert = data.status
      this.bodyAlert = data.message
      $("#toastQuery").show()
      this.notEmployee = false
      this.selectedEmployee = null
    },
    error => {
      this.titleAlert = "Error"
      this.bodyAlert = error.message
      $("#toastQuery").show()
    })
    setTimeout(() =>
      this.closeToast()
      ,7000);
  }

  selectEmployee(e: any){
    this.selectedEmployee = e
  }

  searchEmployee(){
    if(this.idEmployee){
      this._conenectedService.getEmployeeById(this.idEmployee).subscribe(data => {
        if(data.status === "success" && data.data){
          this.employees = of([data.data])
          this.notEmployee = false
        }
        else{
          this.employees = of([])
          this.notEmployee = true
        }
        this.titleAlert = data.status
        this.bodyAlert = data.message
        $("#toastQuery").show()
        this.selectedEmployee = null
      },
      error => {
        this.titleAlert = "Error"
        this.bodyAlert = error.message
        $("#toastQuery").show()
      })
    }
    else{
      this._conenectedService.getEmployees().subscribe(data => {
        if(data.status === "success")
          this.employees = of(data.data)
        this.titleAlert = data.status
        this.bodyAlert = data.message
        $("#toastQuery").show()
        this.notEmployee = false
        this.selectedEmployee = null
      },
      error => {
        this.titleAlert = "Error"
        this.bodyAlert = error.message
        $("#toastQuery").show()
      })
    }
    setTimeout(() =>
      this.closeToast()
      ,7000)
  }

  closeToast(){
    $("#toastQuery").hide();
  }
}