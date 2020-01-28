import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../services/team.service';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public teamDetails;

  constructor(private teamService: TeamService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTeamDetails(this.route.snapshot.params.name);
  }

  getTeamDetails(name: string) {
    this.teamService.getTeamByName(name).subscribe(
      data => {
        this.teamDetails = data;
      },
      err => console.error(err),
      () => console.log('team loaded')
    );
  }
}
