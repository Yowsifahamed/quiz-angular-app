import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private selectedNavigation = new BehaviorSubject<any>('Trending');
  
  constructor(private httpClient: HttpClient) { }

  fetchDashboardData(){
    return this.httpClient.get('../../assets/db/quizCollection.json')
  }

  setSelectedNavigation(nav:string){
    this.selectedNavigation.next(nav)
  }

  getSelectedNavigation(){
    return this.selectedNavigation.asObservable();
  }
}
