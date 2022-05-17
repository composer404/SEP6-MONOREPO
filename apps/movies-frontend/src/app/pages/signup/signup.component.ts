import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  url: any;
  msg = "";


  constructor(private router: Router, private authService: AuthService) { }

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
      this.url = reader.result;
    }
  }

  public async onSignUp() {
    this.signupForm.get(`login`);
    this.signupForm.get(`email`);
    this.signupForm.get(`password`);
    this.signupForm.get(`firstName`);
    this.signupForm.get(`lastName`);
    this.signupForm.get(`avatar`);

    const token = await this.authService.signup();

    if (token) {
      const profile = await this.authService.getProfile();
      this.router.navigateByUrl(`/board/${profile.id}`);
    }
  }
}
