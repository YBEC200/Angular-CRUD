import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { forkJoin, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]   // 👈 Añádelo aquí
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  roles: string[] = [];
  ciudades: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const users$ = this.userService.getUsers();
    const roles$ = of(['admin', 'user', 'guest']).pipe(delay(500));
    const ciudades$ = of(['Lima', 'Cusco', 'Arequipa']).pipe(delay(800));

    forkJoin([users$, roles$, ciudades$]).subscribe(
      ([users, roles, ciudades]) => {
        this.users = users;
        this.roles = roles;
        this.ciudades = ciudades;
      }
    );
    
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }
}
