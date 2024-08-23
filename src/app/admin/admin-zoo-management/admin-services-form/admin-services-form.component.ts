import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {IZooService} from "../../../../shared/interfaces/zoo-service.interface"
import {FilesService} from "../../../../shared/services/files.service";
import {ZooServiceService} from "../../../../shared/services/zoo-service.service";
import {IZooServiceDTO} from "../../../../shared/interfaces/zoo-serviceDTO.interface";
import {AsyncPipe, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-admin-services-form',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe
  ],
  templateUrl: './admin-services-form.component.html',
  styleUrl: './admin-services-form.component.css'
})
export class AdminServicesFormComponent {
  @ViewChild('fileinput', {static: true}) inputRef!: ElementRef;
  selectedFiles: File[] = [];

  // FORM CONTROLS
  Id = new FormControl<number | null>(null);
  Name = new FormControl<string>('');
  Description = new FormControl<string>('');
  FullPrice = new FormControl<number | null>(null);
  ChildPrice = new FormControl<number | null>(null);

  // PROPS
  protected id: string | null = null;
  protected deletedImageStr: string | null = null;

  // OBSERVABLES
  public service$: Observable<IZooService | undefined> = new Observable<IZooService | undefined>();
  public filesHolder$: Observable<File[]> = new Observable<File[]>();

  constructor(private activatedRoute: ActivatedRoute,
              private zooService: ZooServiceService,
              private fs: FilesService) {
    this.service$ = this.zooService.zooService$;
    this.filesHolder$ = this.fs.filesHolder$;
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      if (this.id) {
        this.zooService.fetchUniqueService(parseInt(this.id));
      } else {
        this.service$ = new Observable<IZooService | undefined>(undefined);
        this.resetForm();
      }
    });

    if (this.id) {
      this.service$.subscribe(service => {
        if (service) {
          if (service.id) {
            this.Id.setValue(service.id);
          }
          this.Name.setValue(service.name);
          this.Description.setValue(service.description);
          this.FullPrice.setValue(service.fullPrice);
          this.ChildPrice.setValue(service.childPrice);
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
      fd.append("image", file);
    });

    const serviceDTO: IZooServiceDTO = {
      id: this.Id.value ?? 0,
      name: this.Name.value ?? '',
      description: this.Description.value ?? '',
      fullPrice: this.FullPrice.value ?? null,
      childPrice: this.ChildPrice.value ?? null,
      deletedImage: this.deletedImageStr ?? null
    };

    // Append properties to FormData
    if (this.id) {
      fd.append("id", serviceDTO.id.toString());
    }
    if (serviceDTO.fullPrice !== null) {
      fd.append("fullPrice", serviceDTO.fullPrice.toString());
    }
    if (serviceDTO.childPrice !== null) {
      fd.append("childPrice", serviceDTO.childPrice.toString());
    }
    if (serviceDTO.deletedImage !== null && this.Id) {
      fd.append("deletedImage", serviceDTO.deletedImage.toString());
    }
    fd.append("name", serviceDTO.name);
    fd.append("description", serviceDTO.description);

    // Choose method based on presence of id
    if (this.id) {
      this.zooService.updateService(this.id, fd)
    } else {
      this.zooService.createService(fd);
    }

    this.resetForm()
  }

  public resetForm() {
    this.Id.reset();
    this.Name.reset();
    this.Description.reset();
    this.FullPrice.reset();
    this.ChildPrice.reset();
    this.selectedFiles = [];
    this.deletedImageStr = null;
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

  public deleteImage(slug: string): void {
    if (this.deletedImageStr === null){
      this.deletedImageStr = slug;
    } else {
      this.deletedImageStr = null;
    }
  }

  public nullifyPrice(field: string, event: any){
    if(event.target.checked){
      if(field === "FullPrice"){
        this.FullPrice.setValue(null);
      } else if(field === "ChildPrice"){
        this.ChildPrice.setValue(null);
      }
    } else {
      if(field === "FullPrice"){
        this.FullPrice.setValue(0);
      } else if(field === "ChildPrice"){
        this.ChildPrice.setValue(0);
      }
    }

  }
}
