import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser',

import { ClientesService } from '../../../services/clientes.service';
import { TextosService } from '../../../services/textos.service';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styles: []
})
export class ClienteEditComponent implements OnInit {
  private form: FormGroup
  private titulo   : string
  private subtitulo: string
  private cliente  : string
  private cancelar : string
  private id: string  
  private validacionNombreRequired : string
  private validacionNombreMinlength: string
  private guardarCambios: string

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
  	          private servicio: ClientesService,
  	          private alert: ToastrService) {

    activatedRoute.params.subscribe(params => {
      this.id = params['id']      
    })
  }

  ngOnInit() {     
      this.titleService.setTitle(TextosService.TITULO_PAGINA_EDITAR_CLIENTE);
      this.titulo    = TextosService.TITULO_PAGINA_EDITAR_CLIENTE;
      this.subtitulo = TextosService.SUBTITULO_PAGINA_EDITAR_CLIENTE;
      this.cancelar  = TextosService.CANCELAR;
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO;
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3;
      this.guardarCambios = TextosService.GUARDAR_CAMBIOS;

      this.form = this.fb.group({
        'nombre': ['', [Validators.required, Validators.minLength(3)]]
      })
      
      this.servicio.obtenerCliente(this.id)
        .subscribe((res: any) => {             
          this.form.controls['nombre'].setValue(res.cliente.nombre)
        })    

  }

  get nombre() {
    return this.form.get('nombre')
  }

  volver() {
    this.router.navigate(['/clientes'])
  }

  actualizarCliente() {
    const cliente = {
      "nombre": this.form.value.nombre
    }

    this.servicio.actualizarCliente(this.id, cliente)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.CLIENTE_ACTUALIZADO, TextosService.ENHORABUENA)
          this.volver()
        },
        (err) => {
          console.log(err)                    
        }
      )    	
  }
}
