import {Component} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {UsersService} from "../../../../shared/services/users.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {IRole} from "../../../../shared/interfaces/role.interface";
import {INewUser} from "../../../../shared/interfaces/new-user.interface";

@Component({
  selector: 'app-admin-employees-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe,
    FormsModule
  ],
  templateUrl: './admin-employees-form.component.html',
  styleUrl: './admin-employees-form.component.css'
})
export class AdminEmployeesFormComponent {

  private id: string | null = null;
  public user$: Observable<IUser | undefined> = new Observable<IUser>(undefined);
  //public roles$: Observable<IRole[]> = new Observable<IRole[]>();
  public employeeForm: FormGroup;

  constructor(private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,) {
    this.user$ = usersService.user$;
    //this.roles$ = usersService.roles$;
    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      Admin: [false],
      Employee: [false],
      Vet: [false]
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.usersService.fetchUniqueEmployee(this.id);
      } else {
        this.resetForm();
      }
    });

    this.user$.subscribe(user => {
      if (user) {
        this.employeeForm.setValue({
          email: user.email,
          password: '',
          Admin: user.roles.includes('Admin'),
          Employee: user.roles.includes('Employee'),
          Vet: user.roles.includes('Vet'),
        })
      }
    })

    this.usersService.fetchRoles();
  }

  public isItChecked(role: string): boolean {
    return false
  }

  public submit() {
    if (this.id){
      const user: IUser ={
        id: this.id,
        email: this.employeeForm.value.email,
        roles: this.formToStringArrayRoles(this.employeeForm)
      }
      this.usersService.putUser(user);
    } else {
      const user: INewUser ={
        email: this.employeeForm.value.email,
        password: this.employeeForm.value.password,
        roles: this.formToStringArrayRoles(this.employeeForm)
      }
      this.usersService.registerUser(user);
    }
  }

  public resetForm() {
    this.usersService.resetUser();
  }

  private formToStringArrayRoles(fg: FormGroup): string[] {
    const roleArray: string[] = [];
    if(fg.value.Admin){
      roleArray.push('Admin')
    }
    if(fg.value.Vet){
      roleArray.push('Vet')
    }
    if(fg.value.Employee){
      roleArray.push('Employee')
    }
    return roleArray;
  }

}
