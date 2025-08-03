import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <header class="bg-white shadow-md" *ngIf="authService.isLoggedIn()">
      <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1 class="text-xl font-bold text-gray-800">App de Votación</h1>
        <button (click)="logout()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cerrar Sesión
        </button>
      </nav>
    </header>
    <main class="container mx-auto p-6">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}