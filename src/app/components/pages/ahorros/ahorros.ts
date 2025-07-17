import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ahorros',
  imports: [CommonModule, DatePipe],
  templateUrl: './ahorros.html',
  styleUrl: './ahorros.css'
})
export class Ahorros implements OnInit{
  ahorros: any[] = [];
  formularioAhorro: FormGroup;
  editando = false;
  idAhorroActual = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.formularioAhorro = this.fb.group({
      nombreAhorro: [''],
      fechaAhorro: [''],
      montoAhorro: ['']
    });
  }

  ngOnInit() {
    this.obtenerAhorros();
  }

  obtenerAhorros() {
    this.http.get<any[]>('http://localhost:4100/api/ahorros').subscribe(data => {
      this.ahorros = data;
    });
  }

  editarAhorro(ahorro: any) {
    this.editando = true;
    this.idAhorroActual = ahorro._id;
    this.formularioAhorro.setValue({
      nombreAhorro: ahorro.nombreAhorro,
      fechaAhorro: ahorro.fechaAhorro.substring(0,10),
      montoAhorro: ahorro.montoAhorro
    });
  }

  guardarEdicion() {
    this.http.put(`http://localhost:4100/api/ahorros/${this.idAhorroActual}`, this.formularioAhorro.value).subscribe(() => {
      this.editando = false;
      this.formularioAhorro.reset();
      this.obtenerAhorros();
    });
  }

  eliminarAhorro(id: string) {
    this.http.delete(`http://localhost:4100/api/ahorros/${id}`).subscribe(() => {
      this.obtenerAhorros();
    });
  }
}
