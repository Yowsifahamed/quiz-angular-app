import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerNavigation : Array<any> = [
    {
      "nav": "Home",
      "routing": ""
    },
    {
      "nav": "All Quizzes",
      "routing": ""
    },
    {
      "nav": "About Us",
      "routing": ""
    },
    {
      "nav": "Contact Us",
      "routing": ""
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
