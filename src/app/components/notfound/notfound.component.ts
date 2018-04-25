import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotFoundComponent implements OnInit {

  titulo : string = "Opps!!. Página no encontrada";

  constructor() { }

  ngOnInit() {
  }

}
