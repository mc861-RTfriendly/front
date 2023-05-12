import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// useful modules:
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// material modules:
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatToolbar, MatToolbarModule, MatSidenavModule, MatListModule,
  MatTabsModule, MatNativeDateModule, MatBadge, MatBadgeModule, MatVerticalStepper, MatStepperModule,
  MatBottomSheet, MatBottomSheetModule, MatMenuModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

const SHARED_MODULES = [
  MatFormFieldModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  MatSnackBarModule,
  MatCardModule,
  MatButtonModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatChipsModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatDialogModule,
  MatTooltipModule,
  HttpClientModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatListModule,
  MatRadioModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatStepperModule,
  RouterModule,
  MatBottomSheetModule,
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SHARED_MODULES
  ],
  exports: [
    SHARED_MODULES,
  ],
})
export class SharedModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
    // Or whatever path you placed mdi.svg at
  }
}
