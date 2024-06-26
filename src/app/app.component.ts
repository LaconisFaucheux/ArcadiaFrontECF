import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
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
import {AnimalService} from "../shared/services/animal.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AnimalsListComponent, AnimalsComponent, HabitatsComponent, HomePageComponent, PhilosophieComponent, ZooServicesComponent, ReviewFormComponent, BreadcrumbComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';

  constructor() {}

  ngOnInit() {

  }

}
