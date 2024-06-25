import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {HabitatService} from "../../shared/services/habitat.service";
import {IHabitat} from "../../shared/interfaces/habitat.interface";
import {Subscription} from "rxjs";
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

  constructor(private habitatService: HabitatService) {
  }

  ngOnInit() {
    this.sub.add(this.habitatService.habitats$.subscribe(habitats => {
      this.habitats = habitats;
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
