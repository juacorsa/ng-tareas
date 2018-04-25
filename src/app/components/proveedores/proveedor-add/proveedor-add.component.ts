import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { ProveedoresService } from '../../../services/proveedores.service'
import { TextosService } from '../../../services/textos.service'
import { ToastrService } from 'ngx-toastr'
import * as swal from 'sweetalert'

@Component({
  selector: 'app-proveedor-add',
  templateUrl: './proveedor-add.component.html'  
})
export class ProveedorAddComponent implements OnInit {
  private form: FormGroup    
  private titulo   : string
  private subtitulo: string
  private registrar: string
  private cancelar : string
  private validacionNombreRequired : string
  private validacionNombreMinlength: string  

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private servicio: ProveedoresService,               
              private alert: ToastrService) {}

  ngOnInit() {
      this.form = this.fb.group({
        'nombre': [null, [Validators.required, Validators.minLength(3)]]
      });

      this.titleService.setTitle(TextosService.TITULO_PAGINA_NUEVO_PROVEEDOR)      
      this.titulo    = TextosService.TITULO_PAGINA_NUEVO_PROVEEDOR
      this.subtitulo = TextosService.SUBTITULO_PAGINA_NUEVO_PROVEEDOR
      this.registrar = TextosService.REGISTRAR_PROVEEDOR      
      this.cancelar  = TextosService.CANCELAR
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3    
    }

  get nombre() {
    return this.form.get('nombre')
  }

  volver() {
    this.router.navigate(['/proveedores'])
  }
  
  registrarProveedor() {
    const proveedor = {
      "nombre": this.form.value.nombre
    }
  
    this.servicio.registrarProveedor(proveedor)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.PROVEEDOR_REGISTRADO, TextosService.ENHORABUENA)
          this.form.reset()                      
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
