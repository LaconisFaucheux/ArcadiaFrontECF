import { Routes } from '@angular/router';
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

export const routes: Routes = [
  {path: "", component: HomePageComponent, pathMatch: "full"},
  {
    path: 'animaux',
    component: AnimalsComponent,
    children: [
      { path: '', component: AnimalsListComponent },
      { path: ':id', component: AnimalsDetailsComponent }
    ]
  },
  {path: "habitats",
    component: HabitatsComponent,
    children: [
      {path: '', component: HabitatsListComponent},
      {path: ':id', component: HabitatsDetailComponent }
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
      { path: '', component: AdminHomepageComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];
