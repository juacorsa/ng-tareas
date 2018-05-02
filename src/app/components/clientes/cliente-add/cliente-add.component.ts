import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ClientesService } from '../../../services/clientes.service'
import { TextosService } from '../../../services/textos.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styles: []
})
export class ClienteAddComponent implements OnInit {
  private form: FormGroup    
  private titulo   : string
  private subtitulo: string
  private registrar: string
  private cancelar : string
  private placeholder : string;
  private atencion    : string;
  private aceptar     : string;
  private error       : string;  
  private validacionNombreRequired : string
  private validacionNombreMinlength: string  

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private servicio: ClientesService,               
              private alert: ToastrService) {}

  ngOnInit() {
      this.form = this.fb.group({
        'nombre': [null, [Validators.required, Validators.minLength(3)]]
      });

      this.titleService.setTitle(TextosService.TITULO_PAGINA_NUEVO_CLIENTE);
      this.titulo    = TextosService.TITULO_PAGINA_NUEVO_CLIENTE;
      this.subtitulo = TextosService.SUBTITULO_PAGINA_NUEVO_CLIENTE;
      this.registrar = TextosService.REGISTRAR_CLIENTE;
      this.cancelar  = TextosService.CANCELAR;
      this.atencion  = TextosService.ATENCION;
      this.aceptar   = TextosService.ACEPTAR;
      this.error     = TextosService.IMPOSIBLE_COMPLETAR_ACCION;
      this.placeholder = TextosService.PLACEHOLDER_NOMBRE_CLIENTE;
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO;
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3;  
    }

  get nombre() {
    return this.form.get('nombre')
  }

  volver() {
    this.router.navigate(['/clientes'])
  }

  registrarCliente() {
    const cliente = {
      "nombre": this.form.value.nombre
    }
  
    this.servicio.registrarCliente(cliente)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.CLIENTE_REGISTRADO, TextosService.ENHORABUENA)
          this.form.reset()                      
        },
        (err) => {
          console.log(err);
          $('#modalError').click();                                                         
        }
      )  	
  } 
}
