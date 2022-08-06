import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'QuizApp';
  currentRouterLink: any;

  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((e:any) => {
      this.currentRouterLink = e.url.split("/")[1];
    });
  }
}
