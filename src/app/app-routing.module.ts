import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentCompareComponent } from './agent-compare/agent-compare.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';


const routes: Routes = [
  { path: 'agent/:name', component: AgentDetailComponent },
  { path: 'compare', component: AgentCompareComponent },
  { path: 'dashboard', component: AgentHomeComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } // Future iteration: 404 page.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
