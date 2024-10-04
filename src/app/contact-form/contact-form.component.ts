import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmailSenderService} from "../../shared/services/email-sender.service";
import {IEmail} from "../../shared/interfaces/email.interface";

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
 public email: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);
 public body: FormControl<string | null> = new FormControl('', [Validators.required]);

 constructor(private emailService: EmailSenderService) {
 }

 submit(){
  if(this.email.value && this.body.value){
    let mail: IEmail = {
      subject: this.email.value,
      body: this.body.value,
      to: null
    }
    this.emailService.sendMailAsVisitor(mail);
  } else {
    alert("L'un des champs est invalide");
  }
 }

}
