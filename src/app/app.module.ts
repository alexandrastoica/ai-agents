import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgentsAPI, AgentsApiService } from './agents-api.service';
import { AgentCardComponent } from './agent-card/agent-card.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentCompareComponent } from './agent-compare/agent-compare.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { AgentCompareChartComponent } from './agent-compare-chart/agent-compare-chart.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Using this to perform search.
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Using this to generate charts.
import { ZingchartAngularModule } from 'zingchart-angular';

// Using Angular Material components.
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    AgentCardComponent,
    AgentDetailComponent,
    AgentCompareComponent,
    AgentHomeComponent,
    AgentCompareChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    ZingchartAngularModule,
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [AgentsAPI, AgentsApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
