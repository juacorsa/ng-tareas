import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { ProveedoresService } from '../../../services/proveedores.service'
import { TextosService } from '../../../services/textos.service'
import { ToastrService } from 'ngx-toastr'
import { Proveedor } from '../../../models/proveedor.interface'

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html'  
})
export class ProveedorEditComponent implements OnInit {
  private form: FormGroup
  private titulo   : string
  private subtitulo: string
  private proveedor: string
  private id: string  
  private validacionNombreRequired : string
  private validacionNombreMinlength: string
  private guardarCambios: string

  constructor(private fb: FormBuilder, 
              private router: Router,
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

      this.titulo    = "Actualizar proveedor"
      this.subtitulo = "A continuación podrás actualizar el proveedor seleccionado. No se permite duplicar proveedores."
      this.validacionNombreRequired  = "Este campo es requerido"
      this.validacionNombreMinlength = "Este campo debe tener una longitud mínima de 3 caracteres"
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
          this.alert.error(err.error.mensaje, TextosService.ERROR)
        }
      )    	
  }
}
