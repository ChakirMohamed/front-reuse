import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




//import { CourriersComponent } from './pages/courriers/courriers.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,





  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: false
    }),
    ToastrModule.forRoot({   // Add this for global Toastr configuration
      timeOut: 3000,         // Toast duration
      positionClass: 'toast-top-center', // Toast position
      preventDuplicates: true, // Prevent duplicate toasts
    }),
    SidebarModule,
    NavbarModule,
    //ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule ,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
