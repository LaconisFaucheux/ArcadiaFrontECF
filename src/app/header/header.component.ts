import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {filter, Observable, Subscription} from "rxjs";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {AuthService} from "../../shared/services/auth.service";
import {IUser} from "../../shared/interfaces/user.interface";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private routeArray: string[] = ["animaux", "habitats", "activites", "philosophie", "auth", "admin"]
  public habitats: IHabitat[] = [];
  public sub: Subscription = new Subscription();
  public isHomePageActive: boolean = false;
  public user$: Observable<IUser | undefined> = new Observable(undefined);

  constructor(private habitatService: HabitatService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.sub.add(this.habitatService.habitats$.subscribe(habitats => {
      this.habitats = habitats;
    }));

    this.sub.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      const navEndEvent = event as NavigationEnd;
      if(!this.routeArray.includes(navEndEvent.url.split('/')[0])){
        navEndEvent.urlAfterRedirects = '/';
      }
      this.isHomePageActive = navEndEvent.urlAfterRedirects === '/';
    }));

    this.user$ = this.authService.user$;
  }

  onLogout() :void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
