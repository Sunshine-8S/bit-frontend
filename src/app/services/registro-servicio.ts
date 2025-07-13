import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroServicio {
  constructor() { }

  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:4100/usuarios/registrarse";

  registrarUsuario(payload:any){
    return this.httpClient.post(this.apiUrl, payload)
  }
}
