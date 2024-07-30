import {Component} from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user.interface";
import {UsersService} from "../../../../shared/services/users.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-employees-list',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    RouterLink
  ],
  templateUrl: './admin-employees-list.component.html',
  styleUrl: './admin-employees-list.component.css'
})
export class AdminEmployeesListComponent {
  public employees$: Observable<IUser[] | undefined> = new Observable(undefined);

  constructor(private usersService: UsersService) {
  }

  public roleAsBg(role: string[]): string {
    if (role.includes('Admin')) {
      return 'table-primary';
    } else if (role.includes('Employee')) {
      return 'table-warning';
    } else if (role.includes('Vet')) {
      return 'table-success';
    } else {
      return '';
    }
  }

  ngOnInit() {
    this.usersService.fetchAllData();
    this.employees$ = this.usersService.users$;
  }

  public getPath(id: string | undefined): string {
    return `detailed/${id}`;
  }
}
