import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">
            Sistema de Votación
          </h1>
          <p class="text-gray-600 text-lg">
            Participa en encuestas y votaciones de manera fácil y segura
          </p>
        </div>
        
        <div class="space-y-4 mt-8">
          <button 
            (click)="navigateToLogin()"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200">
            Iniciar Sesión
          </button>
          
          <button 
            (click)="navigateToRegister()"
            class="w-full flex justify-center py-3 px-4 border-2 border-indigo-600 rounded-md shadow-sm text-lg font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200">
            Registrarse
          </button>
        </div>
        
        <div class="text-center mt-6">
          <p class="text-sm text-gray-500">
            ¿Ya tienes una cuenta? Inicia sesión para acceder a las votaciones disponibles.
          </p>
        </div>
      </div>
    </div>
  `
})
export class IndexComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
