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
  user = {};
  data;
  hide = true;
  public form: FormGroup;
  // baseUrl = `/profile/${this.data.id}`;
  returnUrl: string;
  constructor(private authenticationService: AuthenticationService,
    public toastr: ToastrManager,
    private fb: FormBuilder, private router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
     }

  getUserInfo() {
    if (this.user !== '') {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      const extractDetails = { user: this.user };
      this.data = extractDetails;
    }
  }

  ngOnInit() {
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
          this.router.navigate([this.returnUrl || `/profile`]);
        },
        error => {
          this.errorMsg = error.error.message;
          this.loading = false;
        });
  }


}
