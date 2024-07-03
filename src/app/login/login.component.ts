import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Ingreso exitoso', response);
        this.dialog.open(SuccessModalComponent, {
          data: {
            message: response.message,
            icon: 'fas fa-check-circle',
            color: 'green'
          }
        });
      },
      error => {
        console.error('Error en el inicio de sesión', error);
        this.dialog.open(SuccessModalComponent, {
          data: {
            message: error.error.message || 'Credenciales de inicio de sesión son inválidas.',
            icon: 'fas fa-times-circle', 
            color: 'red'
          }
        });
      }
    );
  }
}
