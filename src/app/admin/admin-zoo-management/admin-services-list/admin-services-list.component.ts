import {Component} from '@angular/core';
import {IZooService} from "../../../../shared/interfaces/zoo-service.interface";
import {Observable} from "rxjs";
import {ZooServiceService} from "../../../../shared/services/zoo-service.service";
import {AnimalFilterPipe} from "../../../../shared/pipes/animal-filter.pipe";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../../loading-spinner/loading-spinner.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-services-list',
  standalone: true,
  imports: [
    AnimalFilterPipe,
    AsyncPipe,
    LoadingSpinnerComponent,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './admin-services-list.component.html',
  styleUrl: './admin-services-list.component.css'
})
export class AdminServicesListComponent {
  public services$: Observable<IZooService[]> = new Observable<IZooService[]>();

  constructor(private zooServices: ZooServiceService) {
    this.services$ = this.zooServices.zooServices$
  }

  ngOnInit() {
    this.zooServices.fetchAllData();
  }

  public getPath(id: number | undefined): string {
    if (id != undefined) {
      return `detailed/${id}`;
    } else {
      return 'register';
    }
  }

  public deleteService(id: number | undefined): void {
    if (confirm('Voulez vous vraiment supprimer cette statistique?')) {
      if (id) this.zooServices.deleteService(id);
    }
  }


}
