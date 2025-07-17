import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logueadoSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  logueado$ = this.logueadoSubject.asObservable();

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.logueadoSubject.next(true); // Notifica que el usuario ha iniciado sesión
  }

  logout(): void {
    localStorage.removeItem('token');
    this.logueadoSubject.next(false); // Notifica que el usuario ha cerrado sesión
  }
}
