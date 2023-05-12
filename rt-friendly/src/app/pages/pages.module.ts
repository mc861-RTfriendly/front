// default modules:
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// shared modules:
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';

// page components:
//import { CreateReportComponent } from './create-report/create-report.component';
//import { CustomReportComponent } from './custom-report/custom-report.component';


@NgModule({
  declarations: [
//    CreateReportComponent,
//    CustomReportComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
    DatePipe,
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
