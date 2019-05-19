import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthenticationService } from '../authentication-service.service';
import { first, take } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  errorMsg;
  public form: FormGroup;
  baseUrl = '/profile';
  returnUrl: string;
  constructor(private authenticationService: AuthenticationService,
    public toastr: ToastrManager,
    private fb: FormBuilder, private router: Router,
    private _activatedRoute: ActivatedRoute) {

      if (this.authenticationService.currentUserValue) {
        this.router.navigate([this.baseUrl]);
      }
     }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });

    this._activatedRoute.queryParamMap.pipe(take(1)).subscribe(params => {
      this.returnUrl = params.get('returnUrl');
    });
  }
  isBtnDisabled() {
    return this.form.invalid || this.loading;
  }

  get f() { return this.form.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          this.toastr.successToastr('Login Authenticated', null, { maxShown: 1 });
          this.form.reset();
          this.router.navigate([this.returnUrl || this.baseUrl]);
        },
        error => {
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }


}
