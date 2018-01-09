import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AppHomeComponent} from './app-home/app-home.component';
import {FormsModule} from '@angular/forms';
import {AppAboutComponent} from './app-about/app-about.component';
import {DataService} from './data.service';
import {WeatherService} from './weather.service';
import {HttpClientModule} from "@angular/common/http";
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppAboutComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
