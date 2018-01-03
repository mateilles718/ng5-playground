import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-app-about',
  templateUrl: './app-about.component.html',
  styleUrls: ['./app-about.component.scss']
})
export class AppAboutComponent implements OnInit {

  aboutId: number;
  goals: any;

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) {
    this.route.params.subscribe((res) => {
      this.aboutId = res.id;
    });
  }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
  }

  sendMeHome() {
    this.router.navigate(['home']);
  }

}
