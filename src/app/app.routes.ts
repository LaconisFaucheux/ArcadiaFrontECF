import {Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {AnimalsComponent} from "./animals/animals.component";
import {HabitatsComponent} from "./habitats/habitats.component";
import {ZooServicesComponent} from "./zoo-services/zoo-services.component";
import {PhilosophieComponent} from "./philosophie/philosophie.component";
import {ReviewFormComponent} from "./review-form/review-form.component";
import {AnimalsListComponent} from "./animals/animals-list/animals-list.component";
import {AnimalsDetailsComponent} from "./animals/animals-details/animals-details.component";
import {HabitatsDetailComponent} from "./habitats/habitats-detail/habitats-detail.component";
import {HabitatsListComponent} from "./habitats/habitats-list/habitats-list.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {AdminHomepageComponent} from "./admin/admin-homepage/admin-homepage.component";
import {AdminEmployeesComponent} from "./admin/admin-employees/admin-employees.component";
import {AdminEmployeesListComponent} from "./admin/admin-employees/admin-employees-list/admin-employees-list.component";
import {AdminEmployeesFormComponent} from "./admin/admin-employees/admin-employees-form/admin-employees-form.component";
import {AdminZooManagementComponent} from "./admin/admin-zoo-management/admin-zoo-management.component";
import {
  AdminAnimalsListComponent
} from "./admin/admin-zoo-management/admin-animals-list/admin-animals-list.component";
import {
  AdminAnimalsFormComponent
} from "./admin/admin-zoo-management/admin-animals-form/admin-animals-form.component";
import {
  AdminHabitatsListComponent
} from "./admin/admin-zoo-management/admin-habitats-list/admin-habitats-list.component";
import {
  AdminHabitatsFormComponent
} from "./admin/admin-zoo-management/admin-habitats-form/admin-habitats-form.component";
import {
  AdminServicesFormComponent
} from "./admin/admin-zoo-management/admin-services-form/admin-services-form.component";
import {
  AdminServicesListComponent
} from "./admin/admin-zoo-management/admin-services-list/admin-services-list.component";
import {
  AdminOpeningHoursManagementComponent
} from "./admin/admin-zoo-management/admin-opening-hours-management/admin-opening-hours-management.component";
import {
  AdminZooManagementLandingPageComponent
} from "./admin/admin-zoo-management/admin-zoo-management-landing-page/admin-zoo-management-landing-page.component";
import {AdminSpeciesListComponent} from "./admin/admin-zoo-management/admin-species-list/admin-species-list.component";
import {AdminSpeciesFormComponent} from "./admin/admin-zoo-management/admin-species-form/admin-species-form.component";
import {
  AdminOpeningHoursFormComponent
} from "./admin/admin-zoo-management/admin-opening-hours-form/admin-opening-hours-form.component";
import {AdminReviewsManagementComponent} from "./admin/admin-reviews-management/admin-reviews-management.component";
import {
  AdminVetVisitsManagementComponent
} from "./admin/admin-vet-visits-management/admin-vet-visits-management.component";
import {
  AdminVetVisitsFormComponent
} from "./admin/admin-vet-visits-management/admin-vet-visits-form/admin-vet-visits-form.component";
import {
  AdminVetVisitsListComponent
} from "./admin/admin-vet-visits-management/admin-vet-visits-list/admin-vet-visits-list.component";
import {AdminChangePasswordComponent} from "./admin/admin-change-password/admin-change-password.component";
import {AdminResetPasswordComponent} from "./admin/admin-reset-password/admin-reset-password.component";
import {authGuard} from "../shared/guards/auth.guard";
import {adminGuard} from "../shared/guards/admin.guard";
import {employeeGuard} from "../shared/guards/employee.guard";
import {vetGuard} from "../shared/guards/vet.guard";
import {
  AdminAnimalFeedingComponent
} from "./admin/admin-zoo-management/admin-animal-feeding/admin-animal-feeding.component";
import {employeeOrVetGuard} from "../shared/guards/employee-or-vet.guard";

export const routes: Routes = [
  {path: "", component: HomePageComponent, pathMatch: "full"},
  {
    path: 'animaux',
    component: AnimalsComponent,
    children: [
      {path: '', component: AnimalsListComponent},
      {path: ':id', component: AnimalsDetailsComponent}
    ]
  },
  {
    path: "habitats",
    component: HabitatsComponent,
    children: [
      {path: '', component: HabitatsListComponent},
      {path: ':id', component: HabitatsDetailComponent}
    ]
  },
  {path: "activites", component: ZooServicesComponent},
  {path: "philosophie", component: PhilosophieComponent},
  {path: "review-creation", component: ReviewFormComponent},
  {path: "auth", component: AuthComponent},
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: AdminHomepageComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard]},
      {path: 'employees', component: AdminEmployeesComponent, canActivate: [adminGuard],
        children: [
          {path: '', component: AdminEmployeesListComponent},
          {path: 'detailed/:id', component: AdminEmployeesFormComponent},
          {path: 'register', component: AdminEmployeesFormComponent, pathMatch: "full"}
        ]
      },
      {
        path: 'zoo-management', component: AdminZooManagementComponent, canActivate: [authGuard],
        children: [
          {path: '', component: AdminZooManagementLandingPageComponent, canActivate: [authGuard]},
          {path: 'animals', component: AdminAnimalsListComponent, canActivate: [authGuard]},
          {path: 'animals/detailed/:id', component: AdminAnimalsFormComponent , canActivate: [employeeGuard]},
          {path: 'animals/new', component: AdminAnimalsFormComponent, pathMatch: "full" , canActivate: [employeeGuard]},
          {path: 'feedings', component: AdminAnimalFeedingComponent, pathMatch: "full", canActivate: [employeeOrVetGuard]},

          {path: 'species', component: AdminSpeciesListComponent, canActivate: [authGuard]},
          {path: 'species/detailed/:id', component: AdminSpeciesFormComponent , canActivate: [employeeGuard]},
          {path: 'species/new', component: AdminSpeciesFormComponent, pathMatch: "full" , canActivate: [employeeGuard]},
          {path: 'habitats', component: AdminHabitatsListComponent , canActivate: [authGuard]},
          {path: 'habitats/detailed/:id', component: AdminHabitatsFormComponent , canActivate: [employeeGuard]},
          {path: 'habitats/new', component: AdminHabitatsFormComponent, pathMatch: "full" , canActivate: [employeeGuard]},
          {path: 'services', component: AdminServicesListComponent, canActivate: [authGuard]},
          {path: 'services/detailed/:id', component: AdminServicesFormComponent , canActivate: [employeeGuard]},
          {path: 'services/new', component: AdminServicesFormComponent, pathMatch: "full" , canActivate: [employeeGuard]},
          {path: 'opening-hours', component: AdminOpeningHoursManagementComponent , canActivate: [employeeGuard]},
          {path: 'opening-hours/:id', component: AdminOpeningHoursFormComponent, pathMatch: "full" , canActivate: [employeeGuard]},
        ]
      },
      {path: 'reviews', component: AdminReviewsManagementComponent, canActivate: [vetGuard]},
      {path: 'vet-reports', component:AdminVetVisitsManagementComponent, canActivate: [vetGuard],
        children: [
          {path: '', component:AdminVetVisitsListComponent, pathMatch: "full"},
          {path: 'new', component:AdminVetVisitsFormComponent, pathMatch: "full"},
        ]},
      {path: 'change-password', component: AdminChangePasswordComponent, pathMatch: "full" , canActivate: [authGuard]},
      {path: 'reset-password/:id', component: AdminResetPasswordComponent, pathMatch: "full" , canActivate: [adminGuard]},
    ]
  }
];
