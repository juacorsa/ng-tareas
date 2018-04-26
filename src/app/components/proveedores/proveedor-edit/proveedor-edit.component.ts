import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { ProveedoresService } from '../../../services/proveedores.service'
import { TextosService } from '../../../services/textos.service'
import { ToastrService } from 'ngx-toastr'
import { Proveedor } from '../../../models/proveedor.model'
import * as swal from 'sweetalert'

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html'  
})
export class ProveedorEditComponent implements OnInit {
  private form: FormGroup
  private titulo   : string
  private subtitulo: string
  private proveedor: string
  private cancelar : string
  private id: string  
  private validacionNombreRequired : string
  private validacionNombreMinlength: string
  private guardarCambios: string

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
  	          private servicio: ProveedoresService, 
  	          private alert: ToastrService) {

    activatedRoute.params.subscribe(params => {
      this.id = params['id']      
    })
  }

  ngOnInit() {     
      this.form = this.fb.group({
        'nombre': ['', [Validators.required, Validators.minLength(3)]]
      })
      
      this.servicio.obtenerProveedor(this.id)
        .subscribe((res: any) => {             
          this.form.controls['nombre'].setValue(res.proveedor.nombre)
        })    

      this.titleService.setTitle(TextosService.TITULO_PAGINA_EDITAR_PROVEEDOR)   
      this.titulo    = TextosService.TITULO_PAGINA_EDITAR_PROVEEDOR
      this.subtitulo = TextosService.SUBTITULO_PAGINA_EDITAR_PROVEEDOR
      this.cancelar  = TextosService.CANCELAR      
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3
      this.guardarCambios = TextosService.GUARDAR_CAMBIOS
  }

  volver() {
    this.router.navigate(['/proveedores'])
  }

  get nombre() {
    return this.form.get('nombre')
  }

  actualizarProveedor() {
    const proveedor = {
      "nombre": this.form.value.nombre
    }

    this.servicio.actualizarProveedor(this.id, proveedor)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.PROVEEDOR_ACTUALIZADO, TextosService.ENHORABUENA)
          this.volver()
        },
        (err) => {
          console.log(err)                    
          swal({
            title : TextosService.ATENCION,
            text  : err.error.mensaje,
            icon  : TextosService.SWAL_ERROR,
            button: TextosService.ACEPTAR
          })
        }
      )    	
  }
}
