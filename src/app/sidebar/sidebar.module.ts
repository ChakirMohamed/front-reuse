import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { CourrierService } from '../services/courrier.service';

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [SidebarComponent],
    exports: [SidebarComponent],
    providers: [CourrierService], // Provide CourrierService here
})
export class SidebarModule {}
