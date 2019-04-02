import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { GridComponent } from '@app/shared/components/grid/grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
