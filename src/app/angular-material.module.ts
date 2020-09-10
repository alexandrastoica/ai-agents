import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatSelectModule,
      MatChipsModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatProgressBarModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatSelectModule,
      MatChipsModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatProgressBarModule
   ],
   providers: []
})

export class AngularMaterialModule { }
