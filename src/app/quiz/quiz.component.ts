import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  totalScore: number = 0;
  totalPoints: number = 0;
  secondInterval: any;
  
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router : Router
    ) {}

  ngOnInit() {
    this.getRouterParamRoleName();
    this.getReleventDataOfRole();
    this.detectTheDeveice();
    this.playAudio();
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
      // console.log(" this.quizRoleName", this.quizRoleName)
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

  correctAnswer(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/correct_answer.mp3";
    audio.load();
    audio.play();
  }

  wrongAnswer(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/wrong_answer.mp3";
    audio.load();
    audio.play();
  }

  newQuestion(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/new_question.mp3";
    audio.load();
    audio.play();
  }

  countDown(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/countdown_end.mp3";
    audio.load();
    audio.play();
  }
  

  startQuiz(){
    this.quizEnabled = true;
    this.quizIndex++;
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
    this.newQuestion();
  }

  selectedAnswer(index:any){
    this.selectedIndex = index;
    this.rightAnswerNumber = this.getroleDetails.quiz_collection[this.quizIndex].correctAnswerIdx;
    if(index == this.rightAnswerNumber){
      this.selectedRigthAnswer = true;
      this.correctAnswer();
      this.totalScoreCount();
    }else{
      this.wrongAnswer();
      this.countMicroSecondIncreamnet = 0;
      this.selectedRigthAnswer = false;
    }

    this.loadSeconds(false);
    this.loadMicroSeconds(false);
    this.nextButtonEnabled = true;
  }

  nextQuiz(){
    this.quizIndex++;
    this.selectedIndex = -1;
    this.resettingIntervalVarivale();
    this.loadSeconds(true);
    this.loadMicroSeconds(true);
    this.newQuestion();

    if(this.getroleDetails.quiz_collection.length == this.quizIndex){
      this.scorePageEnabled = true;
    }
  }

  resettingIntervalVarivale(){
    this.nextButtonEnabled = false;
    this.maxSeconds = 14;
    this.maxMicroSeconds = 1000;
    this.countSecondIncreamnet = 0;
    this.countMicroSecondIncreamnet = 0;
    this.countingState = false;
  }

  totalScoreCount(){
    this.totalScore = this.maxMicroSeconds + this.totalScore;
    console.log("total",this.totalScore)
  }

  loadSeconds(value:any) {
    let that = this;
    let intervalState = value;
    this.secondInterval = setInterval(function () {

      if (that.maxSeconds < 1) {
        intervalState = false;
        clearInterval(that.secondInterval);
        that.nextButtonEnabled = true;
      }  

      if (intervalState) {
        that.maxSeconds--;
      }

    }, 1000);

    if (!intervalState) {
      clearInterval(that.secondInterval);
      that.secondInterval = 0;
      that.countSecondIncreamnet = that.maxSeconds;
      that.countingState = true;
      that.nextButtonEnabled = true;
      that.maxSeconds = 0;
    }
  }

  loadMicroSeconds(value:any) {
    let that = this;
    let intervalState = value;
    var microInterval: any;
     microInterval = setInterval(function () {

      if (that.maxMicroSeconds < 1) {
        intervalState = false;
        clearInterval(microInterval);
        that.nextButtonEnabled = true;
      }

      if (intervalState) {
        that.maxMicroSeconds--;
      }
    }, 14);

    if (!intervalState) {
      clearInterval(microInterval);
      that.countingState = true;
      that.nextButtonEnabled = true;
      that.countMicroSecondIncreamnet = that.maxMicroSeconds;
      that.maxMicroSeconds = 0;
    }
  }

  retakeQuiz(){
    window.location.reload();
  }

  
}
