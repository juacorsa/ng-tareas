import { Injectable } from '@angular/core';

@Injectable()
export class TextosService {
  static ERROR : string = "Error"
  static ENHORABUENA : string = "Enhorabuena!!"
  static ATENCION    : string = "Atención!!"
  static PROVEEDOR_REGISTRADO  : string = "El proveedor se ha registrado correctamente"
  static PROVEEDOR_ACTUALIZADO : string = "El proveedor se ha actualizado correctamente"
  static SIN_DATOS 			   : string = "Oopss!!. Al parecer no hay datos que mostrar ...."
  static GUARDAR_CAMBIOS 	   : string = " Guardar cambios"
  static REGISTRAR_PROVEEDOR   : string = " Registrar proveedor"
  static IMPOSIBLE_COMPLETAR_ACCION : string = "Ha sido imposible completar la acción solicitada."

    
  constructor() { }
}
