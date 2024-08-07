import {Component, HostListener} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AnimalsListComponent} from "./animals/animals-list/animals-list.component";
import {AnimalsComponent} from "./animals/animals.component";
import {HabitatsComponent} from "./habitats/habitats.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PhilosophieComponent} from "./philosophie/philosophie.component";
import {ZooServicesComponent} from "./zoo-services/zoo-services.component";
import {ReviewFormComponent} from "./review-form/review-form.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {AuthService} from "../shared/services/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AnimalsListComponent, AnimalsComponent, HabitatsComponent, HomePageComponent, PhilosophieComponent, ZooServicesComponent, ReviewFormComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';

  constructor(private cookieService: CookieService) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.cookieService.deleteAll();
  }


}
