import {Component} from '@angular/core';
import {IUser} from "../../../../shared/interfaces/user.interface";
import {UsersService} from "../../../../shared/services/users.service";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {IRole} from "../../../../shared/interfaces/role.interface";
import {EmployeeFilterPipe} from "../../../../shared/pipes/employee-filter.pipe";

@Component({
  selector: 'app-admin-employees-list',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    RouterLink,
    EmployeeFilterPipe
  ],
  templateUrl: './admin-employees-list.component.html',
  styleUrl: './admin-employees-list.component.css'
})
export class AdminEmployeesListComponent {
  public employees$: Observable<IUser[] | undefined> = new Observable(undefined);
  public roles$: Observable<IRole[]> = new Observable();
  public filters: string[] = [];

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
    this.usersService.fetchRoles();
    this.employees$ = this.usersService.users$;
    this.roles$ = this.usersService.roles$;
    this.roles$.subscribe(roles => {
      for (let role of roles) {
        this.filters = [];
        this.filters.push(role.name);
      }
    });
  }

  public getPath(id: string | undefined): string {
    return `detailed/${id}`;
  }

  public addOrRemoveFilters(event: any, roleName: string) {
    if (event.target.checked && !this.filters.includes(roleName)) {
      this.filters.push(roleName);
    } else {
      this.filters.splice(this.filters.indexOf(roleName), 1);
    }
  }

  public deleteUSer(id: string | undefined) {
    if (confirm('Voulez vous vraiment supprimer cet(te) employé(e)?')) {
      if (id) this.usersService.deleteUser(id);
    }
  }
}
