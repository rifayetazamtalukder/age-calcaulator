import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Age Calculator';

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    // close-white
    this.iconRegistry.addSvgIcon(
      'close-white',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/close-white-48dp.svg')
    );
    // menu-white
    this.iconRegistry.addSvgIcon(
      'menu-white',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/menu-white-48dp.svg')
    );
    // more-vert-white
    this.iconRegistry.addSvgIcon(
      'more-vert-white',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/more_vert-white-48dp.svg')
    );
    // settings-dark-gray
    this.iconRegistry.addSvgIcon(
      'settings-dark-gray',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/settings-dark-gray-48dp.svg')
    );
    // announcement-dark-gray
    this.iconRegistry.addSvgIcon(
      'announcement-dark-gray',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/announcement-dark-gray-48dp.svg')
    );
    // help-dark-gray
    this.iconRegistry.addSvgIcon(
      'help-dark-gray',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/help-dark-gray-48dp.svg')
    );
    // person-dark-gray
    this.iconRegistry.addSvgIcon(
      'person-dark-gray',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/person-dark-gray-48dp.svg')
    );
    // facebook-blue
    this.iconRegistry.addSvgIcon(
      'facebook-blue',
      this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svg-icons/facebook-blue.svg')
    );
  }
}
