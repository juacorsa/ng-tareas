import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class ClientesService {
  private headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
  
  constructor(private http: HttpClient) { }

  obtenerClientes(desde: number = 0): Observable<Cliente[]> {
 	  return this.http.get<Cliente[]>(`${environment.api}/clientes?desde=${desde}`)      
  }

  obtenerCliente(id: string) {
    return this.http.get(`${environment.api}/clientes/${id}`)      
  }

  registrarCliente(cliente: Cliente): Observable<Cliente> {
  	return this.http.post<Cliente>(`${environment.api}/clientes`, cliente, this.headers)
  }

  buscarClientes(termino: string) {
    return this.http.get(`${environment.api}/clientes/buscar/${termino}`)      
  }

  actualizarCliente(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.api}/clientes/${id}`, cliente, this.headers)
  }
}
