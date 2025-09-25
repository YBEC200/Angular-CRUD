import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCrudComponent } from './components/user.crud/user.crud.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, UserCrudComponent, DashboardComponent]
})
export class AppComponent {
  title = 'crud';
}
