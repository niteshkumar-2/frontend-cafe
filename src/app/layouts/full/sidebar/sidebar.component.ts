// import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
// import { MediaMatcher } from '@angular/cdk/layout';
// import jwt_decode from 'jwt-decode';
// import { MenuItems } from 'src/app/shared/menu-items';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: [],
// })
// export class AppSidebarComponent implements OnDestroy {
//   mobileQuery: MediaQueryList;
//   token: any = localStorage.getItem('token');
//   tokenPayload: any;

//   private _mobileQueryListener: () => void;
//   menuItems: any;

//   constructor(
//     changeDetectorRef: ChangeDetectorRef,
//     media: MediaMatcher,
//     public menuItem: MenuItems
//   ) {
//     this.tokenPayload = jwt_decode(this.token);
//     this.mobileQuery = media.matchMedia('(min-width: 768px)');
//     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
//     this.mobileQuery.addListener(this._mobileQueryListener);
//   }

//   ngOnDestroy(): void {
//     this.mobileQuery.removeListener(this._mobileQueryListener);
//   }
// }

import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import jwt_decode from 'jwt-decode';
import { MenuItems } from 'src/app/shared/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],  // Reference to the CSS file
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  token: string | null = localStorage.getItem('token');
  tokenPayload: any;

  private _mobileQueryListener: () => void;
  menuItems: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItem: MenuItems
  ) {
    if (this.token) {
      this.tokenPayload = jwt_decode(this.token);
    } else {
      // Handle case where token is not available
      this.tokenPayload = {};
    }

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.menuItems = this.menuItem.getMenuitem();  // Initialize menu items
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
