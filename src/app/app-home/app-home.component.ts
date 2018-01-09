import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {WeatherService} from '../weather.service';
import {Chart} from 'chart.js';
import {Link, Node} from '../d3/models';
import APP_CONFIG from '../app.config';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  itemCount: number;
  goalText: string;
  goals = [];
  chart = [];
  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private _data: DataService, private _weather: WeatherService) {
  }

  ngOnInit() {
    this._data.goal.subscribe((res) => {
      this.goals = res;
    });
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);

    this.drawChartJs();
    this.drawD3Js();
  }

  drawD3Js() {
    const N = APP_CONFIG.N,
      getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }


  drawChartJs() {
    this._weather.dailyForecast()
      .subscribe((res) => {
        console.log(res);
        const temp_max = res['list'].map(res => res.main.temp_max);
        const temp_min = res['list'].map(res => res.main.temp_min);
        const alldates = res['list'].map(res => res.dt);

        const weatherDates = [];
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}))
        });

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: "#3cba9f",
                fill: false
              },
              {
                data: temp_min,
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
              events: ['onHover']
            }
          }
        });
      });
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
  }
}
