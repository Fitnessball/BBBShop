import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AsyncPipe, NgIf} from "@angular/common";




@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClient],
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'BBBShop';

  constructor(private router: Router) {
  }

  ngOnInit() {
    


    

  }

}
