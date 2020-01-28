import { Component, OnInit } from '@angular/core';
import {FixtureService} from '../../services/fixture.service';

import 'bootstrap/dist/js/bootstrap.bundle';
import {LeagueService} from '../../services/league.service';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  private page: number = 0;
  private selectedLeague: number = -1;
  private teamSelected: string = null;
  public fixtures: Array<any>;
  public leagues;
  public teams;
  public pages: Array<number>;

  constructor(private fixtreService: FixtureService,
              private leagueService: LeagueService,
              private teamService: TeamService) { }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;

    if (this.selectedLeague === -1) {
        this.getFixtures();
    } else if (this.teamSelected === null) {
      this.onSelectLeague(this.selectedLeague);
    } else {
      this.onSelectTeam(this.teamSelected);
    }
  }

  ngOnInit() {
    this.getFixtures();
    this.getLeagues();
  }

  getFixtures() {
    this.fixtreService.getFixtures(this.page).subscribe(
      data => {
        this.fixtures = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  getLeagues() {
    this.leagueService.getLeagues().subscribe(
      data => { this.leagues = data; },
      err => console.error(err),
      () => console.log('leagues loaded')
    );
  }

  getTeams() {
    this.teamService.getTeamsByLeagueId(this.selectedLeague).subscribe(
      data => {
        this.teams = data;
      },
      err => console.error(err),
      () => console.log('teams loaded')
    );
  }

  onSelectLeague(id: number) {
    this.fixtreService.getFixturesByLeagueId(id, this.page).subscribe(
      data => {
        if (id === -1) {
          this.teams = [];
          this.teamSelected = null;
          this.getFixtures();
          return;
        }
        this.fixtures = data['content'];
        this.pages = new Array(data['totalPages']);
        this.selectedLeague = id;
        this.teamSelected = null;
        this.getTeams();
        },
      err => console.error(err),
      () => console.log('fixtures loaded')
    );
  }

  onSelectTeam(teamName: string) {
    this.fixtreService.getFixturesByTeam(teamName, this.page).subscribe(
      data => {
        this.fixtures = data['content'];
        this.pages = new Array(data['totalPages']);
        this.teamSelected = teamName;
      },
      (error) => {
        console.error(error);
      },
    () => console.log('fixtures for team loaded')
    );
  }
}
