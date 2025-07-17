import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoServicio } from '../../../services/ingreso-servicio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperar',
  imports: [ReactiveFormsModule],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css'
})
export class RecuperarComponent {
  formularioRecuperar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ingresoServicio: IngresoServicio,
    private router: Router
  ) {
    this.formularioRecuperar = this.fb.group({
      emailUsuario: ['', [Validators.required, Validators.email]],
      nuevaContrasena: ['', Validators.required]
    });

  }

  handleRecuperarContrasena() {
    if (this.formularioRecuperar.valid) {
      const datos = {
        emailUsuario: this.formularioRecuperar.value.emailUsuario,
        nuevaContrasena: this.formularioRecuperar.value.nuevaContrasena,
      };
      console.log('🚀 Enviando datos:', datos);

      this.ingresoServicio.actualizarContraseña(datos).subscribe({
        next: (res: any) => {
          console.log("Contraseña actualizada correctamente", res);
        },
        error: (err) => {
          console.log("Error al recuperar la contraseña", err);
        }
      });
    }
  }
}
