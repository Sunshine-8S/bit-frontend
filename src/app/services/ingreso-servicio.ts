import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresoServicio {
  constructor() { }

  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:4100/api/usuarios/ingresar";

  loginUsuario(payload:any){
    return this.httpClient.post(this.apiUrl, payload)
  }

  actualizarContraseña(data: any) {
    return this.httpClient.put("http://localhost:4100/api/usuarios/recuperarContrasena", data);
  }

}
