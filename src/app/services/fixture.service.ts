import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  constructor(private http: HttpClient) { }

  getFixtures(page: number) {
    return this.http.get('/server/api/fixtures?page=' + page);
  }

  getFixturesByLeagueId(leagueId: number, page: number) {
    return this.http.get('/server/api/fixtures/' + leagueId + '?page=' + page);
  }

  getFixturesByTeam(teamName: string, page: number) {
    return this.http.get('/server/api/fixtures/team/' + teamName + '?page=' + page);
  }

  createFixture(fixture) {
    let body = JSON.stringify(fixture);
    return this.http.post('/server/api/fixtures', body, httpOptions);
  }
}
