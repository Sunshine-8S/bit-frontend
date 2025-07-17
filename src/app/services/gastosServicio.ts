import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GastosServicio {
  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:4100/api/gastos"; // Asegúrate de que tenga /api

  // Obtener todos los gastos
  getTodosGastos() {
    return this.httpClient.get(this.apiUrl);
  }

  // Crear nuevo gasto
  crearGasto(data: any) {
    return this.httpClient.post(this.apiUrl, data);
  }

  // Actualizar gasto existente
  actualizarGasto(id: string, data: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar gasto
  eliminarGasto(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
