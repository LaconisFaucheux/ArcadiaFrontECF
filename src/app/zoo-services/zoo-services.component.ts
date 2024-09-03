import {Component} from '@angular/core';
import {IZooService} from "../../shared/interfaces/zoo-service.interface";
import {Observable} from "rxjs";
import {ZooServiceService} from "../../shared/services/zoo-service.service";
import {AsyncPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {ApiService} from "../../shared/services/api.service";

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
  public apiUrl: string = '';
  public imageApiUrl: string = '';
  public zooServices$: Observable<IZooService[]>;

  constructor(private zooServiceService: ZooServiceService, private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.zooServices$ = this.zooServiceService.getZooServices()
  }

  ngOnInit() {
    this.zooServiceService.fetchAllData()
  }

  public getPicPath(param : any){
    return `${this.apiUrl}/${param}`
  }
}
