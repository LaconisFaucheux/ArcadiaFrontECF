import {Component, Input} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {AnimalService} from "../../../shared/services/animal.service";
import {isEmpty, Observable, Subscription} from "rxjs";
import {AsyncPipe, TitleCasePipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-animals-details',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './animals-details.component.html',
  styleUrl: './animals-details.component.css'
})
export class AnimalsDetailsComponent {

  private id: string | null = null;
  public apiUrl = '';
  public imageApiUrl: string = '';
  public animal$: Observable<IAnimal> = new Observable<IAnimal>();

  constructor(private activatedRoute: ActivatedRoute,
              private animalService: AnimalService,
              private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.animal$ = this.animalService.getAnimal();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    })
    this.animalService.fetchUniqueAnimal(parseInt(String(this.id)));
  }
}
