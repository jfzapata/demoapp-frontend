import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { RouterModule } from '@angular/router';

// Components
import { GridComponent } from '@app/shared/components/grid/grid.component';
import { FloatingActionsComponent } from '@app/shared/components/floating-actions/floating-actions.component';
import { RowActionsComponent } from '@app/shared/components/row-actions/row-actions.component';

// Material components
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  declarations: [
    GridComponent,
    FloatingActionsComponent,
    RowActionsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    EcoFabSpeedDialModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    RouterModule,
    GridComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    FloatingActionsComponent
  ]
})
export class SharedModule { }
