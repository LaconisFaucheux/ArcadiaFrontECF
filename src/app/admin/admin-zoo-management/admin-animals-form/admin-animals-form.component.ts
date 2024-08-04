import {Component, ElementRef, ViewChild} from '@angular/core';
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {IAnimal} from "../../../../shared/interfaces/animal.interface";
import {IHabitat} from "../../../../shared/interfaces/habitat.interface";
import {AnimalService} from "../../../../shared/services/animal.service";
import {ISpecies} from "../../../../shared/interfaces/species.interface";
import {FilesService} from "../../../../shared/services/files.service";

@Component({
  selector: 'app-admin-animals-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './admin-animals-form.component.html',
  styleUrl: './admin-animals-form.component.css'
})
export class AdminAnimalsFormComponent {

  private id: string | null = null;
  public animal$: Observable<IAnimal | undefined> = new Observable<IAnimal>(undefined);
  public speciess$: Observable<ISpecies[]> = new Observable<ISpecies[]>();
  public filesHolder$: Observable<File[]> = new Observable<File[]>();
  public animalForm: FormGroup;
  protected deletedImages: number[] = []
  protected deleteBtnText: string = "Supprimer";

  constructor(private animalService: AnimalService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private fs: FilesService) {
    this.animal$ = animalService.animal$;
    this.speciess$ = this.animalService.species$
    this.filesHolder$ = this.fs.filesHolder$;
    this.animalForm = this.fb.group({
      id: '',
      name: '',
      isMale: '',
      Species: '',
      pics: []
    })
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
        this.animalForm.setValue({
          id: animal.id,
          name: animal.name,
          isMale: animal.isMale ? 'male' : 'female',
          Species: animal.speciesData.name,
          pics: animal.pics
        })
      }
    })
  }

  public isItChecked(role: string): boolean {
    return false
  }

  public submit() {
    //console.log(this.filesHolder$)
  }

  public resetForm() {
    // this.usersService.resetUser();
  }

  private formToStringArrayRoles(fg: FormGroup): string[] {
    const roleArray: string[] = [];
    if (fg.value.Admin) {
      roleArray.push('Admin')
    }
    if (fg.value.Vet) {
      roleArray.push('Vet')
    }
    if (fg.value.Employee) {
      roleArray.push('Employee')
    }
    return roleArray;
  }

  public addFiles($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      this.fs.addFiles(files);
    }
  }

  public removeFile(index: number) {
    this.fs.removeFile(index);
  }

  public deleteImage(id: number): void {

    if (this.deleteBtnText === 'Supprimer') {

      this.deleteBtnText = 'Annuler';
      this.deletedImages.push(id);

    } else if (this.deleteBtnText === 'Annuler') {

      this.deleteBtnText = 'Supprimer';
      this.deletedImages.splice(this.deletedImages.indexOf(id), 1);
    }
  }
}
