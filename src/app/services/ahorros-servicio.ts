import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AhorrosServicio {
  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:4100/api/ahorros";

  //Obtener todos los ahorros
  getTodosAhorros() {
    return this.httpClient.get(this.apiUrl);
  }

  // Crear nuevo ahorro
  crearAhorro(data: any) {
    return this.httpClient.post(this.apiUrl, data);
  }

  // Actualizar ahorro existente
  actualizarAhorro(id: string, data: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar ahorro
  eliminarAhorro(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
