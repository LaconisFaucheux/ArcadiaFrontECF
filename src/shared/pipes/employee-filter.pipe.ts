import { Pipe, PipeTransform } from '@angular/core';
import {IUser} from "../interfaces/user.interface";

@Pipe({
  name: 'employeeFilter',
  standalone: true,
  pure: false
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: IUser[], filters: string[]): IUser[] {
    return employees.filter(user =>
      user.roles.some(roles =>
        filters.includes(roles)))
  }

}
