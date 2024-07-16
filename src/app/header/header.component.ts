import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {filter, Subscription} from "rxjs";
import {TitleCasePipe} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";

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

  constructor(private habitatService: HabitatService,
              private router: Router,
              private authService: AuthService,) {
  }

  ngOnInit() {
    this.sub.add(this.habitatService.habitats$.subscribe(habitats => {
      this.habitats = habitats;
      this.authService.user$.subscribe(user => {console.log(user)});
    }));

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
