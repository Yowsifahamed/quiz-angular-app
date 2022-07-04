import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  navigationClickEvent(navigation:number){
    this.selectedArrayIndex = navigation
  }

}
