import {Component, ElementRef, ViewChild} from '@angular/core';
import {AsyncPipe, UpperCasePipe} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FilesService} from "../../../../shared/services/files.service";
import {IHabitat} from "../../../../shared/interfaces/habitat.interface";
import {HabitatService} from "../../../../shared/services/habitat.service";
import {ApiService} from "../../../../shared/services/api.service";

@Component({
  selector: 'app-admin-habitats-form',
  standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        ReactiveFormsModule,
        UpperCasePipe
    ],
  templateUrl: './admin-habitats-form.component.html',
  styleUrl: './admin-habitats-form.component.css'
})
export class AdminHabitatsFormComponent {

  @ViewChild('fileinput', {static: true}) inputRef!: ElementRef;
  selectedFiles: File[] = [];

  // FORM CONTROLS
  Id = new FormControl<number | null>(null);
  Name = new FormControl<string>('');
  Description = new FormControl<string>('');
  deletedImages = new FormControl<number[]>([]);

  // PROPS
  public apiUrl: string = '';
  public imageApiUrl: string = '';
  private id: string | null = null;
  protected deletedImagesArray: number[] = [];

  // OBSERVABLES
  public habitat$: Observable<IHabitat | undefined> = new Observable<IHabitat | undefined>();
  public filesHolder$: Observable<File[]> = new Observable<File[]>();


  constructor(private habitatService: HabitatService,
              private activatedRoute: ActivatedRoute,
              private fs: FilesService,
              private apiService: ApiService) {
    this.apiUrl = this.apiService.getapiUrl();
    this.imageApiUrl = this.apiService.getImageApiUrl();
    this.habitat$ = this.habitatService.habitat$
    this.filesHolder$ = this.fs.filesHolder$;
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.habitatService.fetchUniqueHabitat(parseInt(this.id));
      } else {
        this.habitat$ = new Observable<IHabitat | undefined>(undefined);
        this.resetForm();
      }
    });

    if (this.id) {
      this.habitat$.subscribe(habitat => {
        if (habitat) {
          if (habitat.id) {
            this.Id.setValue(habitat.id);
          }
          this.Name.setValue(habitat.name);
          this.Description.setValue(habitat.description);
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

    const habitatDTO = {
      id: this.Id.value ?? 0,
      name: this.Name.value ?? '',
      description: this.Description.value ?? '',
      images: this.selectedFiles,
      deletedImages: this.deletedImagesArray
    }

    // Append properties to FormData
    if(this.id) {
      fd.append("id", habitatDTO.id.toString());
      habitatDTO.deletedImages.forEach(imgId => {
        fd.append("deletedImages", imgId.toString());
      })
    }
      fd.append("name", habitatDTO.name.toString());
      fd.append("description", habitatDTO.description.toString());



    //Choose method based on presence of id
    if(this.id){
      this.habitatService.updateHabitat(this.id, fd)
    } else{
      this.habitatService.createHabitat(fd);
    }

    this.resetForm()
  }

  public resetForm() {
    this.Id.reset();
    this.Name.reset();
    this.Description.reset();
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
