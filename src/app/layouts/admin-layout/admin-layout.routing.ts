import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
// import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { CourriersComponent } from '../../pages/courriers/courriers.component';
import { CreateCourrierComponent } from 'app/pages/courriers/create-courrier/create-courrier.component';
import { CreateStepComponent } from 'app/pages/STEP/create-step/create-step.component';
import { AllCollectivitesComponent } from 'app/pages/Collectivites/all-collectivites/all-collectivites.component'
import { ListStepsComponent } from 'app/pages/STEP/list-steps/list-steps.component'
import { EditStepComponent } from 'app/pages/STEP/edit-step/edit-step.component';
import { ListConventionsComponent } from 'app/pages/conventions/list-conventions/list-conventions.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'courriers/type/:nom',        component: CourriersComponent },
    { path: 'create-courriers',        component: CreateCourrierComponent },
    { path: 'ajouter-step',        component: CreateStepComponent },
    { path: 'collectivites',        component: AllCollectivitesComponent },
    { path: 'list-steps',        component: ListStepsComponent },
    { path: 'edit-step/:id', component: EditStepComponent },
    //conventions
    { path: 'conventions', component: ListConventionsComponent },
];
