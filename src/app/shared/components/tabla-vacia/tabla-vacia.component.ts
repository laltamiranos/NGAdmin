import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-vacia',
  templateUrl: './tabla-vacia.component.html',
  styles: [`
    .icono-table-vacia {
      font-size: 14em;
      color: #858d93;
    }
  `]
})
export class TablaVaciaComponent implements OnInit {

  @Input() texto: string;

  constructor() { }

  ngOnInit() {
  }

}
