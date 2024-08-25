import { Component } from '@angular/core';
import {IReview} from "../../../shared/interfaces/review.interface";
import {Observable} from "rxjs";
import {ReviewService} from "../../../shared/services/review.service";
import {AsyncPipe} from "@angular/common";
import {LoadingSpinnerComponent} from "../../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-admin-reviews-management',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent
  ],
  templateUrl: './admin-reviews-management.component.html',
  styleUrl: './admin-reviews-management.component.css'
})
export class AdminReviewsManagementComponent {
  public validatedReviews$: Observable<IReview[]> = new Observable<IReview[]>();
  public unvalidatedReviews$: Observable<IReview[]> = new Observable<IReview[]>();

  public validated: boolean = false;

  constructor( private reviewService: ReviewService) {
    this.validatedReviews$ = this.reviewService.validatedReviews$;
    this.unvalidatedReviews$ = this.reviewService.unvalidatedReviews$;
  }

  ngOnInit(): void {
    this.reviewService.fetchValidatedReviews();
    this.reviewService.fetchUnvalidatedReviews();
  }

  public validatedSwitch(event: any): void {
    this.validated = event.target.checked;
  }

  public validateReview(review: IReview): void {
    review.isValidated = true;
    this.reviewService.updateReview(review.id.toString(), review)
  }

  public deleteReview(id: number): void {
    this.reviewService.deleteReview(id.toString());
  }

}
