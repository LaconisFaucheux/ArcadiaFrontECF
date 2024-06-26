import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {filter, Subscription} from "rxjs";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public habitats: IHabitat[] = [];
  public sub: Subscription = new Subscription();
  public isHomePageActive: boolean = false;

  constructor(private habitatService: HabitatService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub.add(this.habitatService.habitats$.subscribe(habitats => {
      this.habitats = habitats;
    }));

    // this.activatedRoute.url.subscribe((url) => {
    //   console.log(this.activatedRoute.paramMap)
    //   console.log('URL ======= ' + url);
    //   this.isHomePageActive = url[0].path === '';
    // })


    this.sub.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navEndEvent = event as NavigationEnd;
      this.isHomePageActive = navEndEvent.urlAfterRedirects === '/';
    }));

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
