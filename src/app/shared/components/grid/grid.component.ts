import { Component, OnInit, Input } from '@angular/core';

// Own
// Types
import { ColumnDefinition } from '@app/common/types/interfaces/coumn-definition';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() columnDefs: ColumnDefinition[];
  @Input() rowData: any[];
  constructor() { }

  ngOnInit() {
  }

}
