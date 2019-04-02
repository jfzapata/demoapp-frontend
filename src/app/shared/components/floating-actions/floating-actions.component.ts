import { Component, OnInit, Input } from '@angular/core';

// Own
// Types
import { FloatingAction } from '@app/common/types/interfaces/floating-action';

@Component({
  selector: 'app-floating-actions',
  templateUrl: './floating-actions.component.html',
  styleUrls: ['./floating-actions.component.scss']
})
export class FloatingActionsComponent implements OnInit {
  @Input() floatingActions: FloatingAction[];
  constructor() { }

  ngOnInit() {
  }

}
