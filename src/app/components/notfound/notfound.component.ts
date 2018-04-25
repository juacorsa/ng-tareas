import { Component, OnInit } from '@angular/core'
import { TextosService } from '../../services/textos.service'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html'  
})
export class NotFoundComponent implements OnInit {

  titulo : string = TextosService.TITULO_PAGINA_NO_ENCONTRADA

  constructor() { }

  ngOnInit() { }
}
