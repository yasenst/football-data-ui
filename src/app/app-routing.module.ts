import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FixtureComponent} from './components/fixture/fixture.component';
import {TeamComponent} from './components/team/team.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: FixtureComponent
  },
  {
    path: 'team/:name',
    component: TeamComponent
  },
  {
    path: 'team',
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
