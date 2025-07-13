import { Component, inject, OnInit } from '@angular/core';
import { GastosServicio } from "../../../services/gastosServicio";
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-gastos',
  imports: [],
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
}
