import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData: any;

  constructor(
    private dashboardService: DashboardService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(){
    this.dashboardService.fetchDashboardData().subscribe((res:any)=>{
      this.dashboardData = res['quizCol'];
    });
  }

  goQuizRoleDetails(data:any) {
    this.router.navigate(['/quiz',data.quiz_role]);
  }


}
