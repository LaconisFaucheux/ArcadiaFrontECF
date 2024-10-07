import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastNotifService {

  constructor(private toastrService: ToastrService) { }

  public showToast(message: string, isSuccess:boolean) {
    if (isSuccess) {
      this.toastrService.success(message);
    } else {
      this.toastrService.error(message);
    }
  }
}
