import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();
  private apiUrl = 'api/users'; // URL del backend falso

  constructor(private http: HttpClient) {
    this.loadUsers().subscribe(); // carga inicial
  }

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(data => this.usersSource.next(data))
    );
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const maxId = this.usersSource.value.length > 0 
      ? Math.max(...this.usersSource.value.map(u => u.id)) 
      : 0;

    const newUser = { ...user, id: maxId + 1 };

    return this.http.post<User>(this.apiUrl, newUser).pipe(
      tap(created => {
        const current = this.usersSource.value;
        this.usersSource.next([...current, created]);
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap(updated => {
        const current = this.usersSource.value.map(u => 
          u.id === updated.id ? updated : u
        );
        this.usersSource.next(current);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.usersSource.value.filter(u => u.id !== id);
        this.usersSource.next(current);
      })
    );
  }
  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
