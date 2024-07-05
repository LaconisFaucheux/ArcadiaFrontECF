import {Component} from '@angular/core';
import {IZooService} from "../../shared/interfaces/zoo-service.interface";
import {Observable} from "rxjs";
import {ZooServiceService} from "../../shared/services/zoo-service.service";
import {AsyncPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-zoo-services',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './zoo-services.component.html',
  styleUrl: './zoo-services.component.css'
})
export class ZooServicesComponent {
  public zooServices$: Observable<IZooService[]>;

  constructor(private zooServiceService: ZooServiceService) {
    this.zooServices$ = this.zooServiceService.getZooServices()
  }

  ngOnInit() {
    this.zooServiceService.fetchAllData()
  }
}
