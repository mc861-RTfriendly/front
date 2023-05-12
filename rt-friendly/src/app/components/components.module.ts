// default components:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// system components:
import { SharedModule } from '../shared.module';

import { FillFieldsComponent } from './fill-fields/fill-fields.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FillFieldsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    FillFieldsComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
