import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GastosServicio {
  private httpClient = inject(HttpClient);
  private apiUrl = "http://localhost:4100/gastos";

  getTodosGastos(){
    return this.httpClient.get(this.apiUrl);
  }
}
