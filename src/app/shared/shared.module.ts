import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

// Components
import { GridComponent } from '@app/shared/components/grid/grid.component';

@NgModule({
  declarations: [
    GridComponent
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
