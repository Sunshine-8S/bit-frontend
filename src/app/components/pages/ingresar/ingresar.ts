import { Component, inject } from '@angular/core';
import { Router } from "@angular/router"
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoServicio } from '../../../services/ingreso-servicio';
import { AuthService } from "../../../services/auth-service";

@Component({
  selector: 'app-ingresar',
  imports: [ ReactiveFormsModule ],
  templateUrl: './ingresar.html',
  styleUrl: './ingresar.css'
})
export class Ingresar {
  router = inject(Router);
  ingresoServicio = inject(IngresoServicio);
  authService = inject(AuthService);
  
  formularioIngreso = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    contraseñaUsuario: new FormControl('', Validators.required),
  });
  
  handleSubmit() {
    if (this.formularioIngreso.valid) {
      this.ingresoServicio.loginUsuario(this.formularioIngreso.value).subscribe((res:any) =>{
        if (res.allOK) {
          this.authService.login(res.data);
          this.router.navigateByUrl("/gastos");
        } else {
          // TODO: notificar
          console.log("Ocurrio un error al iniciar sesion");
        }
      },
      (err) => {
        console.log("Información incorrecta");
      }
      );
    } else {
      // TODO: notificar
      console.log("Formulario innvalido");
    }
  }

  irARecuperar() {
    this.router.navigateByUrl('/recuperar');
  }
}
