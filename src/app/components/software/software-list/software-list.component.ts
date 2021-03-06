import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

import { SoftwareService } from '../../../services/software.service';
import { Software } from '../../../models/software.model';
import { TextosService } from '../../../services/textos.service';

@Component({
  selector: 'app-software-list',
  templateUrl: './software-list.component.html',
  styles: []
})
export class SoftwareListComponent implements OnInit {
  private softwares   : Software[] = [];
  private subscription: Subscription;
  private sinDatos    : string;
  private subtitulo   : string;
  private atencion    : string;
  private error       : string;
  private aceptar     : string;
  private hayDatos    : boolean = false;
  private total       : number  = 0;
  private desde       : number  = 0;

  constructor(private servicio: SoftwareService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(TextosService.TITULO_PAGINA_SOFTWARE);
    this.subtitulo = TextosService.SUBTITULO_PAGINA_SOFTWARE;
  	this.sinDatos  = TextosService.SIN_DATOS;
    this.atencion  = TextosService.ATENCION;
    this.aceptar   = TextosService.ACEPTAR;
    this.error     = TextosService.IMPOSIBLE_COMPLETAR_ACCION;
  	this.obtenerSoftwares();
  }

  obtenerSoftwares() {
  	this.subscription = this.servicio.obtenerSoftwares(this.desde)
  		.subscribe(
  			(res: any) => {                   
  				this.softwares = res.softwares;          		
  				this.hayDatos = res.total > 0;  				
  				this.total = (this.hayDatos) ? res.total : 0;          
  			},
  			(err: any) => {
          console.log(err);
          $('#modalError').click();
        }
  		)  	
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  buscarSoftware(termino: string) {
    if (!termino) {
      this.obtenerSoftwares();
      return;
    }

    this.subscription = this.servicio.buscarSoftware(termino)
      .subscribe(
        (res: any) => {                   
          this.softwares = res.softwares
          this.total = res.total
          this.hayDatos = res.software.length > 0
        },
        (err: any) => {
          console.log(err);
          $('#modalError').click();
        }
      )   
  }

  actualizarDesde(valor: number) {
    let desde = this.desde + valor;    
    
    if ((desde > this.total) || (desde < 0)) return;
    this.desde += valor;
    this.obtenerSoftwares()
  }
}
