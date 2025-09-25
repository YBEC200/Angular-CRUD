import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user.crud.component.html',
  styleUrls: ['./user.crud.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserCrudComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private subscription!: Subscription;

  currentUser: User = {
    id: 0,
    name: '',
    email: '',
    telefono: '',
    role: 'user',
    fechaNacimiento: new Date(),
    DNI: '',
    direccion: '',
    ciudad: '',
    distrito: ''
  };

  isEditing = false;
  showModal = false;
  loading = false;
  statusMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // 🔹 Ahora escuchamos el BehaviorSubject
    this.subscription = this.userService.users$.subscribe(data => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    // 🔹 Evita fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  saveUser(): void {
    this.loading = true; // Mostrar indicador de carga

    if (this.isEditing) {
      this.userService.updateUser(this.currentUser).subscribe({
        next: () => {
          this.userService.loadUsers().subscribe(() => {
            this.isEditing = false;
            this.resetForm();
            this.closeModal();
            this.loading = false; // Ocultar indicador de carga
            this.statusMessage = '✅ Usuario actualizado con éxito';
          });
        },
        error: () => {
          this.loading = false; // Ocultar indicador de carga
          this.statusMessage = '❌ Error al actualizar el usuario';
        }
      });
    } else {
      forkJoin({
        created: this.userService.addUser(this.currentUser),
        refreshed: this.userService.loadUsers()
      }).subscribe({
        next: () => {
          this.loading = false; // Ocultar indicador de carga
          this.resetForm();
          this.closeModal();
          this.statusMessage = '✅ Usuario agregado con éxito';
        },
        error: () => {
          this.loading = false; // Ocultar indicador de carga
          this.statusMessage = '❌ Error al agregar el usuario';
        }
      });
    }
  }

  deleteUser(id: number): void {
    forkJoin({
      deleted: this.userService.deleteUser(id),
      refreshed: this.userService.loadUsers()
    }).subscribe({
      next: () => {
        this.statusMessage = '✅ Operación realizada con éxito';
        this.loading = false;
      },
      error: () => {
        this.statusMessage = '❌ Ocurrió un error';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.currentUser = {
      id: 0,
      name: '',
      email: '',
      telefono: '',
      role: 'user',
      fechaNacimiento: new Date(),
      DNI: '',
      direccion: '',
      ciudad: '',
      distrito: ''
    };
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  editUser(user: User): void {
    this.currentUser = { ...user };
    this.isEditing = true;
    this.showModal = true;
  }
}

