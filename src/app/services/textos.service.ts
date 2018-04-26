import { Injectable } from '@angular/core';

@Injectable()
export class TextosService {
  static CANCELAR     : string = "Cancelar"  
  static ACEPTAR      : string = "Aceptar"  
  static ENHORABUENA  : string = "Enhorabuena!!"
  static ATENCION     : string = "Atención!!"
  static SWAL_ERROR   : string = "error"
  static SWAL_SUCCESS : string = "success"
  static SIN_DATOS 			       : string = "Oopss!!. Al parecer no hay datos que mostrar ...."
  static GUARDAR_CAMBIOS 	     : string = " Guardar cambios"
  static IMPOSIBLE_COMPLETAR_ACCION : string = "Ha sido imposible completar la acción solicitada."

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

  // Textos de clientes
  static TITULO_PAGINA_NUEVO_CLIENTE    : string = "Registrar un nuevo cliente"
  static SUBTITULO_PAGINA_NUEVO_CLIENTE : string = "A continuación podrás registrar un nuevo cliente. No se permite duplicar clientes."
  static TITULO_PAGINA_EDITAR_CLIENTE   : string = "Editar cliente"
  static SUBTITULO_PAGINA_EDITAR_CLIENTE: string = "A continuación podrás actualizar los datos del cliente seleccionado. No se permite duplicar clientes."
  static TITULO_PAGINA_CLIENTES         : string = "Mantenimiento de clientes"
  static SUBTITULO_PAGINA_CLIENTES      : string = "A continuación se muestran todos los clientes registrados en la base de datos, ordenados alfabéticamente."
  static CLIENTE_REGISTRADO  : string = "El cliente se ha registrado correctamente"
  static CLIENTE_ACTUALIZADO : string = "El cliente se ha actualizado correctamente"
  static REGISTRAR_CLIENTE   : string = " Registrar cliente"

  // Textos de software
  static TITULO_PAGINA_NUEVO_SOFTWARE    : string = "Registrar un nuevo software"
  static SUBTITULO_PAGINA_NUEVO_SOFTWARE : string = "A continuación podrás registrar un nuevo software. No se permite duplicar software."
  static TITULO_PAGINA_EDITAR_SOFTWARE   : string = "Editar software"
  static SUBTITULO_PAGINA_EDITAR_SOFTWARE: string = "A continuación podrás actualizar los datos del software seleccionado. No se permite duplicar software."
  static TITULO_PAGINA_SOFTWARE         : string = "Mantenimiento de software"
  static SUBTITULO_PAGINA_SOFTWARE      : string = "A continuación se muestran todos los software registrados en la base de datos, ordenados alfabéticamente."
  static SOFTWARE_REGISTRADO  : string = "El software se ha registrado correctamente"
  static SOFTWARE_ACTUALIZADO : string = "El software se ha actualizado correctamente"
  static REGISTRAR_SOFTWARE   : string = " Registrar software"

  // Textos de validación
  static VALIDACION_CAMPO_REQUERIDO : string = "Este campo es requerido"
  static VALIDACION_CAMPO_MINIMO_3  : string = "Este campo debe tener una longitud mínima de 3 caracteres"
    
  constructor() { }
}
