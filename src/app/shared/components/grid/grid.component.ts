import { Component, OnInit, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

// Own
// Types
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';
// Declaratives
import { RowActionsComponent } from '@app/shared/components/row-actions/row-actions.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() columnDefs: ColumnDefinition[]; // The columns
  @Input() rowData: any[]; // The records to display
  paginationPageSize = 5;
  frameworkComponents = {
    rowActions: RowActionsComponent,
  };
  constructor() { }

  ngOnInit() {
  }

}
