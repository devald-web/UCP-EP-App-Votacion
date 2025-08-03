import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  template: `
    <header class="bg-white shadow-lg sticky top-0 z-50">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <a routerLink="/home" class="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          VotaApp
        </a>
        <div class="flex items-center space-x-4">
          <a routerLink="/home" class="text-gray-600 hover:text-indigo-600">Inicio</a>
          <a *ngIf="authService.isAdmin()" routerLink="/admin" class="text-gray-600 hover:text-indigo-600 font-semibold">Panel de Admin</a>
          <button *ngIf="authService.isLoggedIn()" (click)="logout()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105">
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4 sm:p-6">
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
