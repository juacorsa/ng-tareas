import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SoftwareService } from '../../../services/software.service'
import { TextosService } from '../../../services/textos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-software-add',
  templateUrl: './software-add.component.html',
  styles: []
})
export class SoftwareAddComponent implements OnInit {
  private form: FormGroup;    
  private titulo   : string;
  private subtitulo: string;
  private registrar: string;
  private cancelar : string;
  private atencion : string;
  private aceptar  : string;
  private error    : string;  
  private validacionNombreRequired : string;
  private validacionNombreMinlength: string;
  private placeholder: string; 

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private servicio: SoftwareService,
              private alert: ToastrService) {}

  ngOnInit(): void {
      this.form = this.fb.group({
        'nombre': [null, [Validators.required, Validators.minLength(3)]]
      });

      this.titleService.setTitle(TextosService.TITULO_PAGINA_NUEVO_SOFTWARE);
      this.titulo    = TextosService.TITULO_PAGINA_NUEVO_SOFTWARE;
      this.subtitulo = TextosService.SUBTITULO_PAGINA_NUEVO_SOFTWARE;
      this.registrar = TextosService.REGISTRAR_SOFTWARE;
      this.cancelar  = TextosService.CANCELAR;
      this.atencion  = TextosService.ATENCION;
      this.aceptar   = TextosService.ACEPTAR;
      this.error     = TextosService.IMPOSIBLE_COMPLETAR_ACCION;
      this.placeholder = TextosService.PLACEHOLDER_NOMBRE_SOFTWARE;      
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO;
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3  
    }

  get nombre() {
    return this.form.get('nombre')
  }

  volver() {
    this.router.navigate(['/software'])
  }

  registrarSoftware() {
    const software = {
      "nombre": this.form.value.nombre
    }
  
    this.servicio.registrarSoftware(software)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.SOFTWARE_REGISTRADO, TextosService.ENHORABUENA)
          this.form.reset()                      
        },
        (err) => {
          console.log(err);
          $('#modalError').click();                                                         
        }
      )  	
  } 
}
