import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  displayName = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    this.authService.register({ email: this.email, password: this.password, displayName: this.displayName }).subscribe({
      next: () => {
        this.successMessage = '¡Registro exitoso! Serás redirigido al login.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error.Message || 'Ocurrió un error en el registro.';
        console.error(err);
      }
    });
  }
}
