import {Component} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AnimalsListComponent} from "./animals/animals-list/animals-list.component";
import {AnimalsComponent} from "./animals/animals.component";
import {HabitatsComponent} from "./habitats/habitats.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {PhilosophieComponent} from "./philosophie/philosophie.component";
import {ZooServicesComponent} from "./zoo-services/zoo-services.component";
import {ReviewFormComponent} from "./review-form/review-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AnimalsListComponent, AnimalsComponent, HabitatsComponent, HomePageComponent, PhilosophieComponent, ZooServicesComponent, ReviewFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
  public isHomePageActive: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('ActivatedRoute', activatedRoute);
  }

  ngOnInit() {
    // this.activatedRoute.url.subscribe((url) => {
    //   this.isHomePageActive = url[0].path === '';
    // })
  }
}
