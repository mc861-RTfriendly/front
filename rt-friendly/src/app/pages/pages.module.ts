// default modules:
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

// shared modules:
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { RequestComponent } from './request/request.component';

// page components:
//import { CustomReportComponent } from './custom-report/custom-report.component';


@NgModule({
  declarations: [
//    CreateReportComponent,
//    CustomReportComponent,
  
    RequestComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
  ],
  exports: [
    RequestComponent
  ],
  providers: [
    DatePipe,
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
