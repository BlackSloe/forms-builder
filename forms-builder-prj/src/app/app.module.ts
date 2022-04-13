import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './_core/authorisation/authentication.module';

import { AppComponent } from './app.component';
import { authenticationFeatureName, reducers } from './_store/app.states';
import { AuthenticationEffects } from './_store/effects/authentication.effects';
import { AuthenticationGuard } from './_helpers/authentication.guard';
import { NavbarModule } from './_core/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AuthenticationModule,
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreModule.forRoot(reducers, { }),
    StoreModule.forFeature(authenticationFeatureName, reducers.authReducer),
    NavbarModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
