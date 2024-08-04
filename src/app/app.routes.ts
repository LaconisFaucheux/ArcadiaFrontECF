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
    children: [
      {path: '', component: AdminHomepageComponent},
      {path: 'dashboard', component: DashboardComponent},
      {
        path: 'employees',
        component: AdminEmployeesComponent,
        children: [
          {path: '', component: AdminEmployeesListComponent},
          {path: 'detailed/:id', component: AdminEmployeesFormComponent},
          {path: 'register', component: AdminEmployeesFormComponent, pathMatch: "full"}
        ]
      },
      {
        path: 'zoo-management', component: AdminZooManagementComponent,
        children: [
          {path: '', component: AdminZooManagementLandingPageComponent},
          {path: 'animals', component: AdminAnimalsListComponent},
          {path: 'animals/detailed/:id', component: AdminAnimalsFormComponent},
          {path: 'animals/new', component: AdminAnimalsFormComponent, pathMatch: "full"},
          {path: 'habitats', component: AdminHabitatsListComponent},
          {path: 'habitats/detailed/:id', component: AdminHabitatsFormComponent},
          {path: 'habitats/new', component: AdminHabitatsFormComponent, pathMatch: "full"},
          {path: 'services', component: AdminServicesListComponent},
          {path: 'services/detailed/:id', component: AdminServicesFormComponent},
          {path: 'services/new', component: AdminServicesFormComponent, pathMatch: "full"},
          {path: 'opening-hours', component: AdminOpeningHoursManagementComponent}
        ]
      }
    ]
  }
];
