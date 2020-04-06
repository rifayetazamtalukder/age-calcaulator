import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'help',
    component: HelpPageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  // 
  // The below wild card component must be at the bottom of the page
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
