import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarea-create',
  templateUrl: './tarea-create.component.html',
  styleUrls: ['./tarea-create.component.scss']
})
export class TareaCreateComponent implements OnInit {
  isEdition = false; // is edition?
  constructor() { }

  ngOnInit() {
  }

}
