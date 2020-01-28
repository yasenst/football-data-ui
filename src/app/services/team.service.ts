import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeamsByLeagueId(leagueId: number) {
    return this.http.get('/server/api/teams/league/' + leagueId);
  }

  getTeamByName(teamName: string) {
    return this.http.get('/server/api/teams?name=' + teamName);
  }
}
