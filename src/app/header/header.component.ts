import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerArray = [
    { nav : "🔥 Trending", type: "Trending" },
    { nav : "🎬 Entertainment", type: "entertainment" },
    { nav : "⚽ Sports", type: "sports" },
    { nav : "✈️ Travel", type: "travel" },
    { nav : "💡 Misc", type: "misc" }
  ]

  // { nav : "🌟 Latest", type: "Latest" },

  selectedArrayIndex: number = 0;
  currentRouterLink: string = "";

  constructor(private router: Router, public dashboardService : DashboardService) {
    router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((e:any) => {
      this.currentRouterLink = e.url.split("/")[1];
    });
  }

  ngOnInit(): void {
  }

  navigationClickEvent(navigation:number){
    this.selectedArrayIndex = navigation;
    this.dashboardService.setSelectedNavigation(this.headerArray[navigation].type)
  }

}
