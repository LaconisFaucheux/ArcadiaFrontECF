import {Component} from '@angular/core';
import {AnimalFilterPipe} from "../../../../shared/pipes/animal-filter.pipe";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {IHabitat} from '../../../../shared/interfaces/habitat.interface';
import {HabitatService} from "../../../../shared/services/habitat.service";

@Component({
  selector: 'app-admin-habitats-list',
  standalone: true,
  imports: [
    AnimalFilterPipe,
    AsyncPipe,
    LoadingSpinnerComponent,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './admin-habitats-list.component.html',
  styleUrl: './admin-habitats-list.component.css'
})
export class AdminHabitatsListComponent {

  public habitats$: Observable<IHabitat[]> = new Observable<IHabitat[]>();

  constructor(private habitatsService: HabitatService) {
    this.habitats$ = habitatsService.habitats$;
  }

  ngOnInit() {
    this.habitatsService.fetchAllData();
  }

  public getPath(id: number | undefined): string {
    if (id != undefined) {
      return `detailed/${id}`;
    } else {
      return 'register';
    }
  }

  public deleteHabitat(id: number | undefined) {
    if (confirm('Voulez vous vraiment supprimer cette statistique?')) {
      if (id) this.habitatsService.deleteHabitat(id)
    }
  }

}
