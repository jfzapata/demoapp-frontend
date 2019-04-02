import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular/dist/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-row-actions',
  templateUrl: './row-actions.component.html',
  styleUrls: ['./row-actions.component.scss']
})
export class RowActionsComponent implements ICellRendererAngularComp {
  public params: any;
  public options: { icon: string; label: string; navigateFunction: Function}[] = [];
  constructor(public _router: Router) { }

  /**
   * executes once the component has already load
   * @param  {any} params
   * @returns void
   */
  public agInit(params: any): void {
    this.params = params;
    this.options = this.params.options;
  }

  /**
   * this method executes when the api execute the method refreshCells
   * @param {any} params
   * @returns Boolean
   */
  public refresh(params: any): boolean {
    return true;
  }

}
