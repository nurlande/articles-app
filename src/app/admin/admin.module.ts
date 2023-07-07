import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    StatisticsComponent
  ]
})
export class AdminModule { }
