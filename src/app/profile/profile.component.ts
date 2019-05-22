import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { AuthenticationService } from '../accounts/authentication-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../accounts/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user = {};
  data;
  showProfile = false;
  showLogin = true;
  userID;
  userInfo;
  constructor(private authenticationService: AuthenticationService,
    public toastr: ToastrManager, private router: Router,
    private ref: ChangeDetectorRef,
    private userService: UserServiceService,
    private route: ActivatedRoute) {
  }
  getUserInfo() {
    if (this.user !== '') {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      const extractDetails = { user: this.user };
      this.data = extractDetails;
    }
  }
  ngOnInit() {
    this.getUserInfo();
    this.fetchSingleUser();

  }

  fetchSingleUser() {
    if (this.user) {
      this.showProfile = true;
      this.showLogin = false;
    } else {
      this.showProfile = false;
      this.showLogin = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.ref.detectChanges();
  }

  home() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.getUserInfo();
    this.ref.markForCheck();
  }


}
