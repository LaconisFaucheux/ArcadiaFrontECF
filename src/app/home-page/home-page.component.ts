import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {BehaviorSubject, of, Subscription} from "rxjs";
import {IHoraires} from "../../shared/interfaces/horaires.interface";
import {IReview} from "../../shared/interfaces/review.interface";
import {HoraireService} from "../../shared/services/horaire.service";
import {ReviewService} from "../../shared/services/review.service";
import {DatePipe} from "@angular/common";
import {IAnimal} from "../../shared/interfaces/animal.interface";
import {AnimalService} from "../../shared/services/animal.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FooterComponent,
    DatePipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public subscription: Subscription = new Subscription();
  public horaires: IHoraires[] = [];
  public reviews: IReview[] = [];
  public randomAnimal: IAnimal | null = null;
  public isOpen: boolean = false;


  constructor(private horairesService: HoraireService, private reviewService: ReviewService, private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.horairesService.horaires$.subscribe(horaires => {
      this.horaires = horaires;
    }));

    // setInterval(this.horairesService.isItOpen, 1000)
    //console.log(this.isOpen)

    this.subscription.add(this.horairesService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen
    }));

    this.subscription.add(this.reviewService.reviews$.subscribe(reviews => {
      this.reviews = reviews
    }));

    this.randomAnimal = this.animalService.getRandomAnimal()

  }

  public getStars(note: number): any[] {
    return new Array(note);
  }

  public getUnStars(note: number): any[] {
    return new Array(5 - note);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
