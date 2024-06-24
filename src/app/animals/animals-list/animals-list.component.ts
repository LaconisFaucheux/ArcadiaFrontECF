import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAnimal} from "../../../shared/interfaces/animal.interface";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.css'
})
export class AnimalsListComponent {
  @Input() animals: IAnimal[] | null = null;
  @Output() animalChanged = new EventEmitter<number>();
  title = 'test';

  public selectAnimal(index: number): void {
    this.animalChanged.emit(index);
  }

}
