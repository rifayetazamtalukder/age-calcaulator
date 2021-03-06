import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Material Modules
import { MaterialModulesModule } from "./material-modules/material-modules.module";

import { HttpClientModule } from "@angular/common/http"; // Needed for svgIcon

import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopnavWithSidenavComponent } from './topnav-with-sidenav/topnav-with-sidenav.component';
import { AgeCalculatorComponent } from './age-calculator/age-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HelpPageComponent,
    AboutPageComponent,
    FooterComponent,
    PageNotFoundComponent,
    TopnavWithSidenavComponent,
    AgeCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModulesModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
