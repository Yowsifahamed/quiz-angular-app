import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(){
    this.dashboardService.fetchDashboardData().subscribe(data=>{
      this.manipulateBasedOnLabel(data,"entertainment")
    });
      // this.dashboardService.fetchDashboardData().subscribe((res: any) => 
      // this.manipulateBasedOnLabel(res,"entertainment")
      // );
  }

  manipulateBasedOnLabel(data:any,quizType:string){
    data.quizCol.forEach((element: any) => {
      if (element[quizType]) {
          this.dashboardData = element[quizType];
      }
    });
  }

}
