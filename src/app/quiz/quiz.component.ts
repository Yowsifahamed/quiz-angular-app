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
  countSecondIncreamnet: number = 0;
  countMicroSecondIncreamnet: number = 0;
  countingState: boolean = false;
  scorePageEnabled: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    ) {}

  ngOnInit() {
    this.getRouterParamRoleName();
    this.getReleventDataOfRole();
    this.detectTheDeveice();
    // this.playAudio();
  }

  detectTheDeveice() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      return true
    }
    else{
      return false
    }
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
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
  }

  selectedAnswer(index:any){
    this.loadSeconds(false);
    this.loadMicroSeconds(false);
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
    this.resettingIntervalVarivale();
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
  }

  resettingIntervalVarivale(){
    this.nextButtonEnabled = false;
    this.maxSeconds = 14;
    this.maxMicroSeconds = 1000;
    this.countSecondIncreamnet = 0;
    this.countMicroSecondIncreamnet = 0;
    this.countingState = false;
  }

  loadSeconds(value:any) {
    let that = this;
    let intervalState = value;
    let interval = setInterval(function () {
      if (intervalState) {
        that.maxSeconds--;
      }

      if (that.maxSeconds < 1) {
        clearInterval(interval);
        that.nextButtonEnabled = true;
      }  

      if (!intervalState) {
        clearInterval(interval);
      }

    }, 1000);

    if (!intervalState) {
      that.countSecondIncreamnet = that.maxSeconds;
      that.countingState = true;
      that.nextButtonEnabled = true;
    }
  }

  loadMicroSeconds(value:any) {
    let that = this;
    let intervalState = value;
    let interval = setInterval(function () {
      if (intervalState) {
        that.maxMicroSeconds--;
      }

      if (that.maxMicroSeconds < 1) {
        clearInterval(interval);
        that.nextButtonEnabled = true;
      }

      if (!intervalState) {
        clearInterval(interval);
      }
    }, 14);

    if (!intervalState) {
      that.countMicroSecondIncreamnet = that.maxMicroSeconds;
      that.countingState = true;
      that.nextButtonEnabled = true;
    }

    console.log("that.maxMicroSeconds",that.maxMicroSeconds)
  }

  
}
