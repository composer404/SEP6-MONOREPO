import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  avatar: any;
  msg = "";


  constructor(private router: Router, private authService: AuthService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      login: new FormControl(``, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(``, [Validators.required]),
      password: new FormControl(``, [Validators.required, Validators.minLength(4)]),
      firstName: new FormControl(``),
      lastName: new FormControl(``),
      avatar: new FormControl(``),
    });
  }

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.avatar = reader.result;
      console.log(this.avatar);
    }
  }

  public clear(): void {
    this.messageService.clear();
  }

  public async onSignUp() {
    const response = await this.authService.signup({
      login: this.signupForm.get('login').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      avatar: this.avatar
    });
    if(response) {
      void this.router.navigateByUrl(`/login`);
      this.addSuccess();
      return;
    }
    this.addError();
  }

  private addSuccess(): void {
    this.messageService.add({severity:'success', summary:'Success', detail:'You have been signed up properly'});
  }

  private addError(): void {
    this.messageService.add({severity:'error', summary:'Error', detail:'You have not been signed up properly'});
  }
}
