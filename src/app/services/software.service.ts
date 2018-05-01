import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Software } from '../models/software.model';

@Injectable()
export class SoftwareService {
  private headers = {headers: new HttpHeaders({"Content-Type": "application/json"})}
  
  constructor(private http: HttpClient) { }

  obtenerSoftwares(desde: number = 0): Observable<Software[]> {
 	  return this.http.get<Software[]>(`${environment.api}/software?desde=${desde}`)      
  }

  obtenerSoftware(id: string) {
    return this.http.get(`${environment.api}/software/${id}`)      
  }

  registrarSoftware(software: Software): Observable<Software> {
  	return this.http.post<Software>(`${environment.api}/software`, software, this.headers)
  }

  buscarSoftware(termino: string) {
    return this.http.get(`${environment.api}/software/buscar/${termino}`)      
  }

  actualizarSoftware(id: string, software: Software): Observable<Software> {
    return this.http.put<Software>(`${environment.api}/software/${id}`, software, this.headers)
  }
}
