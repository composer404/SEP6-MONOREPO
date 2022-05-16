import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth/auth.service";
import {AlertService} from "../../core/services/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading = false;
  public submitted = false;
  public loginForm: FormGroup | undefined;
  public returnUrl: string | undefined;
  public username: string = '';
  public password: string = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private alertService: AlertService
              ) { }

  ngOnInit(): void {
    this.prepareFormControls();
    this.returnUrl = this.getReturnUrl();
  }

  public async onLogin(): Promise<void> {
    await this.authService.login(this.username, this.password);
  }

  public cancelLogin(): void {
    this.router.navigate(['intro']);
  }

  public onSubmit() {
    this.submitted = true;

    // if (this.isFormInvalid()) {
    //   return;
    // }

    this.loading = true;

    // this.tryLogIn();
  }

  private isUserAlreadyLogged(): boolean {
    return this.authService.getTokenValue() ? true : false;
  }

  private prepareFormControls(): void {
    this.loginForm = this.formBuilder.group(this.getControlsConfig());
  }

  private getReturnUrl(): string {
    return this.route.snapshot.queryParams['returnUrl'] || 'tabs/dashboard';
  }

  private getControlsConfig() {
    return {
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    };
  }

  // private isFormInvalid(): boolean {
  //   return this.loginForm.invalid;
  // }

  // private tryLogIn(): void {
  //   this.authService.login(this.getEmail(), this.getDeviceUuid())
  //     .pipe(first())
  //     .subscribe(() => this.router.navigate([this.returnUrl]),
  //       error => {
  //         this.error = error;
  //         this.loading = false;
  //         this.showAlert();
  //       });
  // }

  // private getEmail(): string {
  //   return this.form.email.value;
  // }

  onClickSignUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
