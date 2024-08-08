import { Component, ElementRef, ViewChild } from '@angular/core';
import { AsyncPipe, UpperCasePipe } from "@angular/common";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Observable } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { IAnimal } from "../../../../shared/interfaces/animal.interface";
import { AnimalService } from "../../../../shared/services/animal.service";
import { ISpecies } from "../../../../shared/interfaces/species.interface";
import { IAnimalDTO } from "../../../../shared/interfaces/animalDTO.interface";
import { FilesService } from "../../../../shared/services/files.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-admin-animals-form',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './admin-animals-form.component.html',
  styleUrl: './admin-animals-form.component.css'
})
export class AdminAnimalsFormComponent {
  @ViewChild('fileinput', { static: true }) inputRef!: ElementRef;
  selectedFiles: File[] = [];

  // FORM CONTROLS
  Id = new FormControl<number | null>(null);
  Name = new FormControl<string>('');
  isMale = new FormControl<boolean>(true);
  idSpecies = new FormControl<number | null>(null);
  idHealth = new FormControl<number | null>(null);
  deletedImages = new FormControl<number[]>([]);

  // PROPS
  private id: string | null = null;
  protected deletedImagesArray: number[] = [];
  protected deleteBtnText: string = "Supprimer";

  // OBSERVABLES
  public animal$: Observable<IAnimal | undefined> = new Observable<IAnimal | undefined>();
  public speciess$: Observable<ISpecies[]> = new Observable<ISpecies[]>();
  public filesHolder$: Observable<File[]> = new Observable<File[]>();

  constructor(private animalService: AnimalService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private fs: FilesService,
              private http: HttpClient) {
    this.animal$ = animalService.animal$;
    this.speciess$ = this.animalService.species$
    this.filesHolder$ = this.fs.filesHolder$;
  }

  ngOnInit(): void {
    this.animalService.fetchSpecies();

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.animalService.fetchUniqueAnimal(parseInt(this.id));
      } else {
        this.resetForm();
      }
    });

    this.animal$.subscribe(animal => {
      if (animal) {
        if (animal.id) {
          this.Id.setValue(animal.id);
        }
        this.Name.setValue(animal.name);
        this.isMale.setValue(animal.isMale);
        this.idSpecies.setValue(animal.idSpecies);
        if (animal.idHealth) {
          this.idHealth.setValue(animal.idHealth);
        }
      }
    })
  }

  public openFile() {
    this.inputRef.nativeElement.click();
  }

  public submit() {
    const fd: FormData = new FormData();

    this.selectedFiles.forEach(file => {
      fd.append("images", file);
    });
    //TODO: FIX SERVER ERROR 415

    const animalDTO: IAnimalDTO = {
      id: this.Id.value ?? 0,
      name: this.Name.value ?? '',
      isMale: this.isMale.value ?? true,
      idSpecies: this.idSpecies.value ?? 0,
      idHealth: this.idHealth.value ?? 0,
      deletedImages: this.deletedImagesArray
    };

    // Append properties to FormData
    fd.append("id", animalDTO.id.toString());
    fd.append("name", animalDTO.name);
    fd.append("isMale", animalDTO.isMale.toString());
    fd.append("idSpecies", animalDTO.idSpecies.toString());
    fd.append("idHealth", animalDTO.idHealth.toString());

    // Append deleted images as JSON string
    fd.append("deletedImages", JSON.stringify(animalDTO.deletedImages));

    // Choose method based on presence of id
    const request$ = this.id
      ? this.http.put(`https://localhost:7015/api/Animals/${this.id}/`, fd)
      : this.http.post(`https://localhost:7015/api/Animals`, fd);

    request$.subscribe({
      next: (response) => {
        console.log('Request successful', response);
      },
      error: (error) => {
        console.error('Request failed', error);
      }
    });
  }

  public resetForm() {
    this.Id.reset();
    this.Name.reset();
    this.isMale.reset();
    this.idSpecies.reset();
    this.idHealth.reset();
    this.selectedFiles = [];
    this.deletedImagesArray = [];
  }

  public addFiles($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  public removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  public deleteImage(id: number): void {
    if (this.deleteBtnText === 'Supprimer') {
      this.deleteBtnText = 'Annuler';
      this.deletedImagesArray.push(id);
    } else if (this.deleteBtnText === 'Annuler') {
      this.deleteBtnText = 'Supprimer';
      const idx = this.deletedImagesArray.indexOf(id);
      if (idx !== -1) {
        this.deletedImagesArray.splice(idx, 1);
      }
    }
  }
}
