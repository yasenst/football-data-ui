import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FixtureService} from './services/fixture.service';
import { FixtureComponent } from './components/fixture/fixture.component';
import {LeagueService} from './services/league.service';
import {TeamService} from './services/team.service';
import { TeamComponent } from './components/team/team.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FixtureComponent,
    TeamComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [FixtureService, LeagueService, TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
