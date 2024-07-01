import { Component } from '@angular/core';
import {filter, Observable, Subscription} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {AnimalService} from "../../shared/services/animal.service";
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {AsyncPipe, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  public isHomePageActive: boolean = false;
  public sub: Subscription = new Subscription();
  public currentRoute: string[] = [];
  public selectedAnimal$: Observable<IAnimal>;
  public selectedHabitat$: Observable<IHabitat>;
  public routesDictionary: Map<string, string> = new Map();
  public isAnimal: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private animalService: AnimalService,
              private habitatService: HabitatService
  ) {
    this.selectedAnimal$ = this.animalService.animal$;
    this.selectedHabitat$ = this.habitatService.habitat$;

      this.routesDictionary.set('animaux', 'Animaux');
      this.routesDictionary.set('habitats', 'Habitats');
      this.routesDictionary.set('activites', 'Activités');
      this.routesDictionary.set('philosophie', 'Philosophie');
      this.routesDictionary.set('review-creation', 'Rédiger un avis');
  }

  ngOnInit() {

    this.sub.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      const navEndEvent = event as NavigationEnd;
      this.isHomePageActive = navEndEvent.urlAfterRedirects === '/';
      this.currentRoute = navEndEvent.urlAfterRedirects.split('/');
      this.isAnimal = this.currentRoute.includes('animaux');
      this.purgeRouteArray();
    }));

    this.currentRoute = this.router.url.split('/');
  }

  public purgeRouteArray() {
    this.currentRoute.shift();
  }

  protected readonly AnimalService = AnimalService;
}
