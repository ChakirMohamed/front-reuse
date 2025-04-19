import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
// import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { ListStepsComponent }         from '../../pages/STEP/list-steps/list-steps.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourriersComponent } from '../../pages/courriers/courriers.component';
import { CreateCourrierComponent } from 'app/pages/courriers/create-courrier/create-courrier.component';
import { CreateStepComponent } from 'app/pages/STEP/create-step/create-step.component';
import { HttpClientModule } from '@angular/common/http';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { AddEntityDialogComponent } from '../../pages/Collectivites/add-entity-dialog/add-entity-dialog.component';
import { AllCollectivitesComponent } from '../../pages/Collectivites/all-collectivites/all-collectivites.component';
import { StepShowModalComponent } from '../../pages/STEP/step-show-modal/step-show-modal/step-show-modal.component';
import { EditStepComponent } from '../../pages/STEP/edit-step/edit-step.component';
import { ListConventionsComponent } from '../../pages/conventions/list-conventions/list-conventions.component';
import { CreateConventionComponent } from '../../pages/conventions/create-convention/create-convention.component';
import { ViewConventionComponent } from '../../pages/conventions/view-convention/view-convention.component';
// Import Angular Material Modules

import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


import { MatListModule } from '@angular/material/list';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MatTreeModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,MatTableModule,MatCardModule,MatListModule,MatBadgeModule

  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    // MapsComponent,
    NotificationsComponent,
    CourriersComponent,
    CreateCourrierComponent,
    CreateStepComponent,
    AddEntityDialogComponent,
    AllCollectivitesComponent,
    ListStepsComponent,
    StepShowModalComponent,
    EditStepComponent,
    CreateConventionComponent,
    ListConventionsComponent,
    ViewConventionComponent,

  ]
})

export class AdminLayoutModule {}
