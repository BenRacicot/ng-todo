import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { environment } from '@app/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { RouterStateModule } from './state/router/router.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot([], {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
    }) : [],
    RouterStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
