import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ReviewService} from "../../shared/services/review.service";

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent {
  public reviewForm: FormGroup = new FormGroup({
    Pseudo: new FormControl(''),
    Note: new FormControl(''),
    Content: new FormControl(''),
  });

  constructor(private reviewService: ReviewService) {

  }

  public submit(): void {
    this.reviewService.postReview(this.reviewForm.value)
  }

}
