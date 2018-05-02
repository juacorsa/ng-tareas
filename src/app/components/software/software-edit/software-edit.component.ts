import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { SoftwareService } from '../../../services/software.service';
import { TextosService } from '../../../services/textos.service';
import { ToastrService } from 'ngx-toastr';
import { Software } from '../../../models/software.model';

@Component({
  selector: 'app-software-edit',
  templateUrl: './software-edit.component.html',
  styles: []
})
export class SoftwareEditComponent implements OnInit {
  private form: FormGroup;
  private titulo   : string;
  private subtitulo: string;
  private cliente  : string;
  private cancelar : string;
  private placeholder: string;
  private atencion   : string;
  private error      : string;
  private aceptar    : string;
  private id: string;
  private validacionNombreRequired : string;
  private validacionNombreMinlength: string;
  private guardarCambios: string;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
  	          private servicio: SoftwareService,
  	          private alert: ToastrService) {

    activatedRoute.params.subscribe(params => {
      this.id = params['id']      
    })
  }

  ngOnInit(): void {     
      this.titleService.setTitle(TextosService.TITULO_PAGINA_EDITAR_SOFTWARE);
      this.titulo    = TextosService.TITULO_PAGINA_EDITAR_SOFTWARE;
      this.subtitulo = TextosService.SUBTITULO_PAGINA_EDITAR_SOFTWARE;
      this.cancelar  = TextosService.CANCELAR;
      this.placeholder = TextosService.PLACEHOLDER_NOMBRE_SOFTWARE;
      this.validacionNombreRequired  = TextosService.VALIDACION_CAMPO_REQUERIDO;
      this.validacionNombreMinlength = TextosService.VALIDACION_CAMPO_MINIMO_3;
      this.guardarCambios = TextosService.GUARDAR_CAMBIOS;
      this.atencion  = TextosService.ATENCION;
      this.aceptar   = TextosService.ACEPTAR;
      this.error     = TextosService.IMPOSIBLE_COMPLETAR_ACCION;

      this.form = this.fb.group({
        'nombre': ['', [Validators.required, Validators.minLength(3)]]
      })
      
      this.servicio.obtenerSoftware(this.id)
        .subscribe((res: any) => {    
          console.log(res);
          this.form.controls['nombre'].setValue(res.software.nombre)
        })    
  }

  get nombre() {
    return this.form.get('nombre')
  }

  volver() {
    this.router.navigate(['/software'])
  }

  actualizarSoftware() {
    const software = {
      "nombre": this.form.value.nombre
    }

    this.servicio.actualizarSoftware(this.id, software)
      .subscribe(
        (res) => {                    
          this.alert.success(TextosService.SOFTWARE_ACTUALIZADO, TextosService.ENHORABUENA)
          this.volver()
        },
        (err) => {
          console.log(err);
          $('#modalError').click();                  
        }
      )    	
  }
}
