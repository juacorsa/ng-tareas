import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'

import { ProveedoresService } from '../../../services/proveedores.service'
import { Proveedor } from '../../../models/proveedor.interface'
import { TextosService } from '../../../services/textos.service'

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html'  
})
export class ProveedorListComponent implements OnInit, OnDestroy {    
  private titulo      : string = "Mantenimiento de proveedores"
  private subtitulo   : string = "A continuación se muestran todos los proveedores registrados en la base de datos, ordenados alfabéticamente."
  private proveedores : Proveedor[] = []
  private subscription: Subscription  
  private sinDatos    : string  = ""
  private hayDatos    : boolean = false
  private total       : number  = 0
  private desde       : number  = 0

  constructor(private servicio: ProveedoresService) { }

  ngOnInit() {
  	this.sinDatos = TextosService.SIN_DATOS
  	this.obtenerProveedores()
  }

  obtenerProveedores() {
  	this.subscription = this.servicio.getProveedores(this.desde)
  		.subscribe(
  			(res: any) => {                   
  				this.proveedores = res.proveedores  			
          this.total = res.total
  				this.hayDatos = this.total > 0
  			},
  			(err: any) => console.log(err)
  		)  	
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  buscarProveedores(termino: string) {
    if (!termino) {
      this.obtenerProveedores()
      return
    }

    this.subscription = this.servicio.searchProveedores(termino)
      .subscribe(
        (res: any) => {                   
          this.proveedores = res.proveedores        
          this.total = res.total
          this.hayDatos = res.proveedores.length > 0
        },
        (err: any) => console.log(err)
      )   
  }

  actualizarDesde(valor: number) {
    let desde = this.desde + valor;    
    
    if ((desde > this.total) || (desde < 0)) return    
    this.desde += valor
    this.obtenerProveedores()
  }

}

