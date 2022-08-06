import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  quizRoleName: string = "";
  private sub: any;
  public getroleDetails: any;
  
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    ) {}

  ngOnInit() {
    this.getRouterParamRoleName();
    this.getReleventDataOfRole();
  }

  getRouterParamRoleName(){
    this.sub = this.route.params.subscribe(params => {
      this.quizRoleName = params['name'];
      console.log(" this.quizRoleName", this.quizRoleName)
   });
  }

  getReleventDataOfRole(){
    this.dashboardService.fetchDashboardData().subscribe((res:any)=>{
      res.quizCol.forEach((element:any) => {
        if(element.quiz_role == this.quizRoleName){
            this.getroleDetails = element;
        }
      });
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
