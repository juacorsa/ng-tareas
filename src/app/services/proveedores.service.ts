import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '../../environments/environment'
import { Proveedor } from '../models/proveedor.interface'

@Injectable()
export class ProveedoresService {
  private headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
  
  constructor(private http: HttpClient) { }

  obtenerProveedores(): Observable<Proveedor[]> {
  	return this.http.get<Proveedor[]>(`${environment.api}/proveedores`)      
  }

  getProveedores(desde: number = 0) {
 	  return this.http.get(`${environment.api}/proveedores?desde=${desde}`)      
  }

  obtenerProveedor(id: string) {
    return this.http.get(`${environment.api}/proveedores/${id}`)      
  }

  registrarProveedor(proveedor: Proveedor): Observable<Proveedor> {
  	return this.http.post<Proveedor>(`${environment.api}/proveedores`, proveedor, this.headers)
  }

  searchProveedores(termino: string) {
    return this.http.get(`${environment.api}/proveedores/buscar/${termino}`)      
  }

  actualizarProveedor(id: string, proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(`${environment.api}/proveedores/${id}`, proveedor, this.headers)
  }

}


 