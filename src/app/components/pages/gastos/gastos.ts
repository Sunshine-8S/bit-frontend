import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GastosServicio } from "../../../services/gastosServicio";
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-gastos',
  imports: [CommonModule, FormsModule],
  templateUrl: './gastos.html',
  styleUrl: './gastos.css'
})
export class Gastos implements OnInit{
  private gastosService = inject(GastosServicio);

  nombreUsuario!: string;
  gastos!: any[];

  ngOnInit():void {
    const token: any = localStorage.getItem("token");
    console.log("token", token);
    const tokenDecodificado = jwtHelperService.decodeToken(token);
    console.log("TokenDecodificado", tokenDecodificado);
    this.nombreUsuario = tokenDecodificado.name;

    this.gastosService.getTodosGastos().subscribe((res:any) => {
      this.gastos = res.data;
      console.log(this.gastos);
    });
  }
  gastoEditando: any = null;

  editarGasto(gasto: any) {
    this.gastoEditando = { ...gasto };
  }

  guardarEdicionGasto() {
    this.gastosService.actualizarGasto(this.gastoEditando._id, this.gastoEditando).subscribe(() => {
      this.gastoEditando = null;
      this.obtenerGastos();
    });
  }

  eliminarGasto(id: string) {
    this.gastosService.eliminarGasto(id).subscribe(() => {
      this.obtenerGastos();
    });
  }

  obtenerGastos() {
    this.gastosService.getTodosGastos().subscribe((res: any) => {
      this.gastos = res.data;
    });
  }

  nuevoGasto = {
    nombreGasto: '',
    fechaGasto: '',
    montoGasto: 0,
    gastoPagado: false
  };

  agregarGasto() {
    this.gastosService.crearGasto(this.nuevoGasto).subscribe(() => {
      this.ngOnInit(); // recargar lista de gastos
    });
  }

  togglePago(gasto: any) {
    gasto.gastoPagado = !gasto.gastoPagado;
    this.gastosService.actualizarGasto(gasto._id, gasto).subscribe();
  }

}
