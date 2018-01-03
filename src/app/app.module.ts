import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { FormsModule } from '@angular/forms';
import { AppAboutComponent } from './app-about/app-about.component';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    AppAboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
