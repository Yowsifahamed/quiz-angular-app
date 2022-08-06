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
  quizEnabled: boolean = false;
  selectedRigthAnswer: boolean = false;
  selectedIndex: number = -1;
  rightAnswerNumber: number = 10;
  quizIndex: number = -1;
  nextButtonEnabled: boolean = false;
  maxSeconds: number = 14;
  maxMicroSeconds: number = 1000;
  
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    ) {}

  ngOnInit() {
    this.getRouterParamRoleName();
    this.getReleventDataOfRole();
    // this.playAudio();
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

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/quiz_splash.mp3";
    audio.load();
    audio.play();
  }

  startQuiz(){
    this.quizEnabled = true;
    this.quizIndex++;
    this.loadSeconds();
    this.loadMicroSeconds();
  }

  selectedAnswer(index:any){
    this.nextButtonEnabled = true;
    this.selectedIndex = index;
    this.rightAnswerNumber = this.getroleDetails.quiz_collection[this.quizIndex].correctAnswerIdx;
    if(index == this.rightAnswerNumber){
      this.selectedRigthAnswer = true;
    }else{
      this.selectedRigthAnswer = false;
    }
  }

  nextQuiz(){
    this.quizIndex++;
    this.selectedIndex = -1;
    this.nextButtonEnabled = false;
  }

  loadSeconds() {
    var that = this;
    let interval = setInterval(function () {
      that.maxSeconds--;
      if(that.maxSeconds < 1 ){
        clearInterval(interval);
    }
      console.log("this.increaseCount",that.maxSeconds)
    }, 1000);
  }

  loadMicroSeconds() {
    var that = this;
    let interval = setInterval(function () {
      that.maxMicroSeconds--;
      if(that.maxMicroSeconds < 1 ){
        clearInterval(interval);
    }
      console.log("this.increaseCount",that.maxMicroSeconds)
    }, 71);
  }

  
}
