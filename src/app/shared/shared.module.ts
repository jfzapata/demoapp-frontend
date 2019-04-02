import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

// Components
import { GridComponent } from '@app/shared/components/grid/grid.component';
import { FloatingActionsComponent } from './components/floating-actions/floating-actions.component';

@NgModule({
  declarations: [
    GridComponent,
    FloatingActionsComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    GridComponent
  ]
})
export class SharedModule { }
