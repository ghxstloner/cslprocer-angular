import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Ingreso exitoso', response); // Añadir consola para verificar la respuesta
        alert(response.message); // Asegurarse de mostrar el mensaje de la respuesta JSON
      },
      error => {
        console.error('Error en el inicio de sesión', error); // Añadir consola para verificar el error
        alert(error.error.message || 'Error en el inicio de sesión'); // Mostrar el mensaje de error de la respuesta JSON
      }
    );
  }
}
