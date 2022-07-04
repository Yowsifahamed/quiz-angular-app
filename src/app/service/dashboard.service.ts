import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  fetchDashboardData(){
    return this.httpClient.get('../../assets/db/quizCollection.json')
  }
}
