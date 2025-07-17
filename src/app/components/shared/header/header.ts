import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnDestroy{
  estaLogueado = false;
  private sub!: Subscription;

  constructor(private router: Router, public authService: AuthService) {
    this.sub = this.authService.logueado$.subscribe(
      (estado) => (this.estaLogueado = estado)
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/ingresar']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

