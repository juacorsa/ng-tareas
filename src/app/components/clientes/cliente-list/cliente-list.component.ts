import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente.model';
import { TextosService } from '../../../services/textos.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styles: []
})
export class ClienteListComponent implements OnInit {
  private titulo      : string = TextosService.TITULO_PAGINA_CLIENTES;
  private subtitulo   : string = TextosService.SUBTITULO_PAGINA_CLIENTES;
  private clientes    : Cliente[] = [];
  private subscription: Subscription;
  private sinDatos    : string  = "";
  private atencion    : string;
  private aceptar     : string;
  private error       : string;
  private hayDatos    : boolean = true;
  private total       : number  = 0;
  private desde       : number  = 0;

  constructor(private servicio: ClientesService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(TextosService.TITULO_PAGINA_CLIENTES);
  	this.sinDatos = TextosService.SIN_DATOS;
    this.atencion = TextosService.ATENCION;
    this.aceptar  = TextosService.ACEPTAR;
    this.error    = TextosService.IMPOSIBLE_COMPLETAR_ACCION;
  	this.obtenerClientes();    
  }

  obtenerClientes() {
  	this.subscription = this.servicio.obtenerClientes(this.desde)
  		.subscribe(
  			(res: any) => {                   
  				this.clientes = res.clientes			
          		this.total = res.total
  				this.hayDatos = this.total > 0
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

  buscarClientes(termino: string) {
    if (!termino) {
      this.obtenerClientes();
      return;
    }

    this.subscription = this.servicio.buscarClientes(termino)
      .subscribe(
        (res: any) => {                   
          this.clientes = res.clientes
          this.total = res.total
          this.hayDatos = res.clientes.length > 0
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
    this.obtenerClientes();
  }  
}

