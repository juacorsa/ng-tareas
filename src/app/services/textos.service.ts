import { Injectable } from '@angular/core';

@Injectable()
export class TextosService {
  static CANCELAR    : string = "Cancelar"  
  static ACEPTAR     : string = "Aceptar"  
  static ENHORABUENA : string = "Enhorabuena!!"
  static ATENCION    : string = "Atención!!"
  static SIN_DATOS 			       : string = "Oopss!!. Al parecer no hay datos que mostrar ...."
  static GUARDAR_CAMBIOS 	     : string = " Guardar cambios"
  static IMPOSIBLE_COMPLETAR_ACCION : string = "Ha sido imposible completar la acción solicitada."
  static SWAL_ERROR   : string = "error"
  static SWAL_SUCCESS : string = "success"

  static TITULO_PAGINA_NO_ENCONTRADA: string = "Opps!!. Página no encontrada"

  // Textos de proveedores
  static TITULO_PAGINA_NUEVO_PROVEEDOR    : string = "Registrar un nuevo proveedor"
  static SUBTITULO_PAGINA_NUEVO_PROVEEDOR : string = "A continuación podrás registrar un nuevo proveedor. No se permite duplicar proveedores."
  static TITULO_PAGINA_EDITAR_PROVEEDOR   : string = "Editar proveedor"
  static SUBTITULO_PAGINA_EDITAR_PROVEEDOR: string = "A continuación podrás actualizar los datos del proveedor seleccionado. No se permite duplicar proveedores."
  static TITULO_PAGINA_PROVEEDORES        : string = "Mantenimiento de proveedores"
  static SUBTITULO_PAGINA_PROVEEDORES     : string = "A continuación se muestran todos los proveedores registrados en la base de datos, ordenados alfabéticamente."
  static PROVEEDOR_REGISTRADO  : string = "El proveedor se ha registrado correctamente"
  static PROVEEDOR_ACTUALIZADO : string = "El proveedor se ha actualizado correctamente"
  static REGISTRAR_PROVEEDOR   : string = " Registrar proveedor"



  // Textos de validación
  static VALIDACION_CAMPO_REQUERIDO : string = "Este campo es requerido"
  static VALIDACION_CAMPO_MINIMO_3  : string = "Este campo debe tener una longitud mínima de 3 caracteres"
    
  constructor() { }
}
