import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateAccountComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) { }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(this.nombre, this.email, this.telefono, this.password).subscribe(
      response => {
        alert('Registro exitoso');
      },
      error => {
        alert('Error en el registro');
      }
    );
  }
}
