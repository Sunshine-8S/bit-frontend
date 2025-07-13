import { Component, inject } from '@angular/core';
import { Router } from "@angular/router"
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoServicio } from "../../../services/ingreso-servicio";

@Component({
  selector: 'app-ingresar',
  imports: [ ReactiveFormsModule ],
  templateUrl: './ingresar.html',
  styleUrl: './ingresar.css'
})
export class Ingresar {
  router = inject(Router);
  ingresoServicio = inject(IngresoServicio);
  
  formularioIngreso = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    contraseñaUsuario: new FormControl('', Validators.required),
  });
  
  handleSubmit() {
    if (this.formularioIngreso.valid) {
      this.ingresoServicio.loginUsuario(this.formularioIngreso.value).subscribe((res:any) =>{
        if (res.allOK) {
          console.log("res", res);
          localStorage.setItem("token", res.data);
          this.router.navigateByUrl("/gastos");
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
