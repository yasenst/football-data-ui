import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../services/team.service';
import {FixtureService} from '../../services/fixture.service';
import {LeagueService} from '../../services/league.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedLeague: any = null;
  public leagues;
  public teams;

  fixtureForm: FormGroup;
  validMessage: string = '';

  constructor(private fixtureService: FixtureService,
              private leagueService: LeagueService,
              private teamService: TeamService) { }

  ngOnInit() {
    this.fixtureForm = new FormGroup({
      league: new FormControl('', Validators.required),
      homeTeam: new FormControl('', Validators.required),
      awayTeam: new FormControl('', Validators.required),
      homeTeamScore: new FormControl('', Validators.required),
      awayTeamScore: new FormControl('', Validators.required),
    });

    this.getLeagues();
  }

  get selectedLeagueVal() {
    return this.selectedLeague;
  }

  set selectedLeagueVal(value) {
    this.selectedLeague = value;
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe(
      data => { this.leagues = data; },
      err => console.error(err),
      () => console.log('leagues loaded')
    );
  }

  onSelectLeague(event: any) {
   this.teamService.getTeamsByLeagueId(this.selectedLeague.id).subscribe(
      data => {
        this.teams = data;
      },
      err => console.error(err),
      () => console.log('teams loaded')
    );
  }

  submitRegistration() {

    if (this.fixtureForm.valid) {
      this.validMessage = "Fixture has been submitted. Thank you!";
      this.fixtureService.createFixture(this.fixtureForm.value).subscribe(
        data => {
          this.fixtureForm.reset();
          return true;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.validMessage = "Please fill out the form before submitting!";
    }
  }

}
