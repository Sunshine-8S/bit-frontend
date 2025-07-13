import { Component, inject } from '@angular/core';
import { Router } from "@angular/router"
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {RegistroServicio} from "../../../services/registro-servicio";

@Component({
  selector: 'app-registrarse',
  imports: [ReactiveFormsModule],
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css'
})
export class Registrarse {
  router = inject(Router);
  registroServicio = inject(RegistroServicio);

  formularioRegistro = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    emailUsuario: new FormControl('', Validators.required),
    contraseñaUsuario: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
 });

  handleSubmit() {
    if (this.formularioRegistro.valid) {
      this.registroServicio.registrarUsuario(this.formularioRegistro.value).subscribe((res:any) =>{
        if (res.allOK) {
          this.router.navigateByUrl("/ingresar");
        } else {
          // TODO: notificar
          console.log("Ocurrió un error");
          
        }
      })
    } else {
      // TODO: notificar
      console.log("Formulario invalido");
    }
  }
}
