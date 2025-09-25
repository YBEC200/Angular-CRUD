import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 1, name: 'Juan', email: 'juan@mail.com', telefono: '999111222', role: 'admin', fechaNacimiento: new Date('1990-01-01'), DNI: '12345678', direccion: 'Av. Siempre Viva 123', ciudad: 'Lima', distrito: 'Miraflores' },
      { id: 2, name: 'Ana', email: 'ana@mail.com', telefono: '999333444', role: 'user', fechaNacimiento: new Date('1995-05-10'), DNI: '87654321', direccion: 'Calle Los Olivos 456', ciudad: 'Cusco', distrito: 'San Blas' }
    ];
    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}