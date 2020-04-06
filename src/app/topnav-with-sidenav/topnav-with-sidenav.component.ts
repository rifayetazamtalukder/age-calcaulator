import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from "@angular/flex-layout";

@Component({
  selector: 'app-topnav-with-sidenav',
  templateUrl: './topnav-with-sidenav.component.html',
  styleUrls: ['./topnav-with-sidenav.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TopnavWithSidenavComponent implements OnInit {

  //#region variables
  private mediaType: Subscription;
  public deviceType: string;
  public isSideNavOpen: boolean;
  public navMode: string;
  //#endregion variables

  // 
  constructor(private mediaObserver: MediaObserver) { }

  // 
  ngOnInit(): void {
    // 
    // This Will Call WHen The Component Will Initiate
    // 
    // Subscribe the mediaObserver Here : Don't unsubscribe this method
    //
    this.mediaType = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        this.deviceType = change.mqAlias;
        // 
        if (this.deviceType === 'xl' || this.deviceType === 'lg') {
          this.navMode = 'side';
          this.isSideNavOpen = true;
        }
        else {
          this.navMode = 'over';
          this.isSideNavOpen = false;
        }
      }
    );
  }

}
