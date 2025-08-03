import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  template: `
    <div class="min-h-screen">
      <!-- Barra de navegación con gradiente -->
      <header class="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg sticky top-0 z-50">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
          <a routerLink="/" class="text-3xl font-bold text-white hover:text-gray-200 transition-colors">
            VotaApp
          </a>
          <div class="flex items-center space-x-6" *ngIf="authService.isLoggedIn()">
            <a routerLink="/home" class="text-white hover:text-gray-200 font-medium transition-colors">Panel</a>
            <a *ngIf="authService.isAdmin()" routerLink="/admin" class="text-white hover:text-gray-200 font-semibold transition-colors">Admin</a>
            <button (click)="logout()" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-full transition-all transform hover:scale-105 backdrop-blur-sm">
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>
      
      <!-- Contenido principal sin márgenes para landing page -->
      <main [class]="isLandingPage() ? '' : 'container mx-auto p-4 sm:p-6'">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isLandingPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/register';
  }
}
