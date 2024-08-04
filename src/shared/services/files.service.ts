import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filesHolder = new BehaviorSubject<File[]>([]);
  public filesHolder$ = this.filesHolder.asObservable();

  constructor(private http: HttpClient) {}

  public addFiles(files: FileList) {
    const filesArray = Array.from(files);
    this.filesHolder.next([...this.filesHolder.value, ...filesArray]);
  }

  public removeFile(index: number) {
    const files = this.filesHolder.value.slice();
    files.splice(index, 1);
    this.filesHolder.next(files);
  }
}
