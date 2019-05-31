import { Component, OnInit, Input, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserServiceService } from 'src/app/accounts/user-service.service';

interface UserResponse {
  user: any;
}

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  public form: FormGroup;
  tabs: any[] = [];
  user = {};
  data: any;
  userData;
  showAbout = false;
  userAbouts;
  loading = false;
  displayAbout = true;
  selected = new FormControl(0);
 @Input() UserData;
  constructor(
    public toastr: ToastrManager,
    private userService: UserServiceService,
    private fb: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUserInfo();
    this.fetchUserData();
  }

  getUserInfo() {
    if (this.user !== '') {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      const extractDetails = { user: this.user };
      this.data = extractDetails;
    }
  }

  fetchUserData() {
    this.userService.getUser(this.UserData.id).subscribe((user: UserResponse) => {
      console.log(user.user)
     if(user) {
       this.userData = user.user;
     }
    });
  }

  newTabHandler(): void {
    if (this.createNewTab()) {
      this.addTab();
      this.focusOnCreatedTab();
    } else {
      this.toastr.warningToastr('Tab already open', null, {maxShown: 1});
    }
    return;
  }

  createNewTab(): boolean {
    const newTabsOpen = this.tabs.filter(tabsOpen => tabsOpen.type === 'CREATION_TYPE');
    if (newTabsOpen.length > 0) {
      return false;
    }
    return true;
  }

  focusOnCreatedTab() {
    this.selected.setValue(this.tabs.length);
  }

  addTab(title?: string, tabContent?: any, type?: string, id?: string): void {
    let newTab;
    if (!title) {
      newTab = { title: 'Create Profile', type: 'CREATION_TYPE' };
    } else if (type === 'NEW_CREATION_TYPE') {
      newTab = { title, content: tabContent, type: 'NEW_CREATION_TYPE', id };
    }

    this.tabs.push(newTab);
    this.focusOnCreatedTab();
  }

  showAboutForm() {
    this.showAbout = true;
    this.displayAbout = false;
    this.form = this.fb.group({
      about: [this.userData.about, Validators.compose([Validators.required])],
    });
  }

  hideAboutForm() {
    this.showAbout = false;
    this.displayAbout = true;
    this.form.reset();

  }

  isBtnDisabled() {
    return this.form.invalid || this.loading;
  }

  get f() { return this.form.controls; }



  submitForm() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;

    this.userService.updateAbout(this.UserData.id, this.f.about.value).subscribe(
      successRes => {
      this.fetchUserData();
      this.toastr.successToastr('About Added Successfully', null, { maxShown: 1 });
      this.hideAboutForm();
        this.changeDetectorRefs.detectChanges();
      },
      errorRes => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
    return false;
  }


  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
