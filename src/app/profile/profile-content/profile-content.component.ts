import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserServiceService } from 'src/app/accounts/user-service.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss']
})
export class ProfileContentComponent implements OnInit {
  tabs: any[] = [];
  user = {};
  data: any;
  userData;
  selected = new FormControl(0);
 @Input() UserData: any;
  constructor(
    public toastr: ToastrManager,
    private userService: UserServiceService,) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    if (this.user !== '') {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      const extractDetails = { user: this.user };
      this.data = extractDetails;
    }
  }

  // fetchUserData() {
  //   this.userService.getUser(this.UserData.id).subscribe((data) => {
  //     console.log(this.UserData);
  //     this.userData = data;
  //   });
  // }

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

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
