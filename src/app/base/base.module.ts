import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from "./base.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
      BaseComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class BaseModule { }
