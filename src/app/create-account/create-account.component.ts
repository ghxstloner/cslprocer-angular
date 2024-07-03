import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule]
})
export class CreateAccountComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;

  constructor(
    private authService: AuthService, 
    public dialog: MatDialog,
    private router: Router
  ) { }
  register() {
    if (!this.termsAccepted) {
      this.showModal('Debes aceptar los términos y condiciones para continuar.', 'fas fa-info-circle', 'red');
      return;
    }

    if (!this.nombre.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.showModal('Todos los campos son obligatorios.', 'fas fa-exclamation-circle', 'red');
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.showModal('Por favor ingresa un correo electrónico válido.', 'fas fa-exclamation-triangle', 'red');
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.showModal('La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un símbolo.', 'fas fa-lock', 'red');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showModal('Las contraseñas no coinciden', 'fas fa-exclamation-triangle', 'red');
      return;
    }

    this.authService.register(this.nombre, this.email, this.telefono, this.password).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.showModal('Registro exitoso', 'fas fa-check-circle', 'green');
        this.clearForm();
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Error en el registro', error);
        this.showModal('El correo electrónico ya existe. Intenta iniciar sesión.', 'fas fa-times-circle', 'red');
      }
    );
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; 
    return re.test(password);
  }

  showModal(message: string, icon: string, color: string) {
    this.dialog.open(SuccessModalComponent, {
      data: { message, icon, color }
    });
  }

  clearForm() {
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
