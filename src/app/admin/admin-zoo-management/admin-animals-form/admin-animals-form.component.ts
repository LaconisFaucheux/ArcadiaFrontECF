import {Component, ElementRef, ViewChild} from '@angular/core';
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {IAnimalDTO} from "../../../../shared/interfaces/animalDTO.interface";
import {FilesService} from "../../../../shared/services/files.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../../../../shared/services/api.service";


//TODO: Fix gender radio button

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
  @ViewChild('fileinput', {static: true}) inputRef!: ElementRef;
  selectedFiles: File[] = [];

  // FORM CONTROLS
  Id = new FormControl<number | null>(null);
  Name = new FormControl<string>('');
  isMale = new FormControl<boolean>(true);
  idSpecies = new FormControl<number | null>(null);
  idHealth = new FormControl<number | null>(null);
  deletedImages = new FormControl<number[]>([]);

  // PROPS
  public apiUrl: string = '';
  public imageApiUrl: string = '';
  private id: string | null = null;
  protected deletedImagesArray: number[] = [];

  // OBSERVABLES
  public animal$: Observable<IAnimal | undefined> = new Observable<IAnimal | undefined>();
  public speciess$: Observable<ISpecies[]> = new Observable<ISpecies[]>();
  public filesHolder$: Observable<File[]> = new Observable<File[]>();


  constructor(private animalService: AnimalService,
              private activatedRoute: ActivatedRoute,
              private fs: FilesService,
              private http: HttpClient,
              private apiService: ApiService,) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
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
        this.animal$ = new Observable<IAnimal | undefined>(undefined);
        this.resetForm();
      }
    });

    if (this.id) {
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
  }

  public openFile() {
    this.inputRef.nativeElement.click();
  }

  public submit() {
    const fd: FormData = new FormData();

    this.selectedFiles.forEach(file => {
      fd.append("images", file);
    });

    const animalDTO: IAnimalDTO = {
      id: this.Id.value ?? 0,
      name: this.Name.value ?? '',
      isMale: this.isMale.value ?? true,
      idSpecies: this.idSpecies.value ?? 0,
      idHealth: this.idHealth.value ?? 0,
      deletedImages: this.deletedImagesArray
    };

    // Append properties to FormData
    if(this.id){
      fd.append("id", animalDTO.id.toString());
      fd.append("name", animalDTO.name);
      fd.append("isMale", animalDTO.isMale.toString());
      fd.append("idSpecies", animalDTO.idSpecies.toString());
      fd.append("idHealth", animalDTO.idHealth.toString());
      animalDTO.deletedImages.forEach(imgId => {
        fd.append("deletedImages", imgId.toString());
      })
    } else{
      fd.append("name", animalDTO.name);
      fd.append("isMale", animalDTO.isMale.toString());
      fd.append("idSpecies", animalDTO.idSpecies.toString());
      fd.append("idHealth", "1");
    }

    // Choose method based on presence of id
    if(this.id){
      this.animalService.updateAnimal(this.id, fd)
    } else{
      this.animalService.createAnimal(fd);
    }

    this.resetForm()
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
    if (!this.deletedImagesArray.includes(id)) {
      this.deletedImagesArray.push(id);
    } else {
      this.deletedImagesArray.splice(this.deletedImagesArray.indexOf(id), 1);
    }
  }
}
