import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

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
    Email: new FormControl(''),
    Pseudo: new FormControl(''),
    Note: new FormControl(''),
    Avis: new FormControl(''),
  });

  public submit(): void {
    console.log(this.reviewForm)
  }

}
