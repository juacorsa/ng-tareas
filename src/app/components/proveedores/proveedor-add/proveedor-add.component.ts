import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { ProveedoresService } from '../../../services/proveedores.service'
import { TextosService } from '../../../services/textos.service'
import { ToastrService } from 'ngx-toastr'
import swal from 'sweetalert'

@Component({
  selector: 'app-proveedor-add',
  templateUrl: './proveedor-add.component.html'  
})
export class ProveedorAddComponent implements OnInit {
  private form: FormGroup    
  private titulo   : string
  private subtitulo: string
  private registrar: string
  private validacionNombreRequired : string
  private validacionNombreMinlength: string  

  constructor(private fb: FormBuilder, 
              private router: Router,
              private servicio: ProveedoresService,               
              private alert: ToastrService) {}

  ngOnInit() {
      this.form = this.fb.group({
        'nombre': [null, [Validators.required, Validators.minLength(3)]]
      });
      this.titulo    = "Registrar un nuevo proveedor"
      this.subtitulo = "A continuación podrás registrar un nuevo proveedor. No se permite duplicar proveedores."
      this.validacionNombreRequired  = "Este campo es requerido"
      this.validacionNombreMinlength = "Este campo debe tener una longitud mínima de 3 caracteres"
      this.registrar = TextosService.REGISTRAR_PROVEEDOR      
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
          swal(TextosService.ATENCION, TextosService.IMPOSIBLE_COMPLETAR_ACCION, "error")          
        }
      )  	
  } 
}
