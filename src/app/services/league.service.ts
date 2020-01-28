import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http: HttpClient) { }

  getLeagues() {
    return this.http.get('/server/api/leagues');
  }
}
