import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AhorrosServicio } from '../../../services/ahorros-servicio';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();
@Component({
  selector: 'app-ahorros',
  imports: [CommonModule, FormsModule],
  templateUrl: './ahorros.html',
  styleUrl: './ahorros.css'
})
export class Ahorros implements OnInit{
  private ahorrosService = inject(AhorrosServicio);

  nombreUsuario!: string;
  ahorros!: any[];

  ngOnInit(): void {
    const token: any = localStorage.getItem("token");
    console.log("token", token);
    const tokenDecodificado = jwtHelperService.decodeToken(token);
    console.log("tokenDecodificado", tokenDecodificado);
    this.nombreUsuario = tokenDecodificado.name;

    this.ahorrosService.getTodosAhorros().subscribe((res:any) => {
      this.ahorros = res.data;
      console.log(this.ahorros);
    });
  }
  ahorroEditando: any = null;

  editarAhorro(ahorro: any) {
    this.ahorroEditando = {...ahorro};
  }

  guardarEdicionAhorro() {
    this.ahorrosService.actualizarAhorro(this.ahorroEditando._id, this.ahorroEditando).subscribe(() => {
      this.ahorroEditando = null;
      this.obtenerAhorros();
    })
  }

  eliminarAhorro(id: string) {
    this.ahorrosService.eliminarAhorro(id).subscribe(() => {
      this.obtenerAhorros();
    });
  }

  obtenerAhorros() {
    this.ahorrosService.getTodosAhorros().subscribe((res: any) => {
      this.ahorros = res.data;
    });
  }

  nuevoAhorro = {
    nombreAhorro: "",
    fechaAhorro: "",
    montoAhorro: 0
  };

  agregarAhorro() {
    this.ahorrosService.crearAhorro(this.nuevoAhorro).subscribe(() => {
      this.ngOnInit();
    });
  }

  /* ahorros: any[] = [];
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
  } */
}
