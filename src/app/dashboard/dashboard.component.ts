import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any = [];
  allCommonData: any = [];
  curentNavigation: string = 'Trending';


  constructor(
    private dashboardService: DashboardService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getCurrentSelectedNavigation();
    this.loadDashboardData();
  }

  loadDashboardData(){
    let data: any = [];
    this.dashboardService.fetchDashboardData().subscribe((res:any)=>{
      this.allCommonData =  res['quizCol'];
      this.dashboardData = this.allCommonData.filter
      this.allCommonData.forEach((element:any) => {
        if (element.type == this.curentNavigation) {
          data.push(element);
          this.dashboardData = data;
        }
      });

      if(this.curentNavigation == 'Trending') {
        this.dashboardData = this.allCommonData;
      }
    });
  }

  getCurrentSelectedNavigation(){
    this.dashboardService.getSelectedNavigation().subscribe(res=>{
      this.curentNavigation = res;
      this.loadDashboardData();
    });
  }

  goQuizRoleDetails(data:any) {
    this.router.navigate(['/quiz',data.quiz_role]);
  }


}
