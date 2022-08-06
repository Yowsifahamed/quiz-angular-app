import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerArray = [
    { nav : "🔥 Trending" },
    { nav : "🌟 Latest" },
    { nav : "🎬 Entertainment" },
    { nav : "⚽ Sports" },
    { nav : "✈️ Travel" },
    { nav : "💡 Misc" }
  ]

  selectedArrayIndex: number = 0;
  currentRouterLink: string = "";

  constructor(private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((e:any) => {
      this.currentRouterLink = e.url.split("/")[1];
    });
  }

  ngOnInit(): void {
  }

  navigationClickEvent(navigation:number){
    this.selectedArrayIndex = navigation
  }

}
