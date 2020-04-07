import { NgModule } from '@angular/core';

// 
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from "@angular/material/icon";

import { MatToolbarModule } from "@angular/material/toolbar";

import { MatMenuModule } from "@angular/material/menu";

import { MatDividerModule } from "@angular/material/divider";

import { MatTooltipModule } from "@angular/material/tooltip";

import { MatInputModule } from "@angular/material/input";

import { MatFormFieldModule } from "@angular/material/form-field";

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from "@angular/material/select";

import { MatListModule } from "@angular/material/list";

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatExpansionModule } from "@angular/material/expansion";

import { MatCardModule } from "@angular/material/card";

import { MatRadioModule } from "@angular/material/radio";

import { MatRippleModule } from '@angular/material/core';


const MATERIAL_COMPONENTS = [
  MatButtonModule,

  MatIconModule,

  MatToolbarModule,

  MatMenuModule,

  MatDividerModule,

  MatTooltipModule,

  MatInputModule,

  MatFormFieldModule,

  MatDatepickerModule,

  MatMomentDateModule,

  MatNativeDateModule,

  MatSelectModule,

  MatListModule,

  MatSidenavModule,

  MatButtonToggleModule,

  MatSnackBarModule,

  MatExpansionModule,

  MatCardModule,

  MatRadioModule,

  MatRippleModule
];



@NgModule({
  declarations: [],
  imports: [
    MATERIAL_COMPONENTS
  ],
  exports: [
    MATERIAL_COMPONENTS
  ]
})
export class MaterialModulesModule { }
