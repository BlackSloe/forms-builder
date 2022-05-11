import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './_core/authorisation/authentication.module';


import { AppComponent } from './app.component';
import { authenticationFeatureName, formBuilderFeatureName, reducers } from './_store/app.states';
import { AuthenticationEffects } from './_store/effects/authentication.effects';
import { AuthenticationGuard } from './_helpers/authentication.guard';
import { NavbarModule } from './_core/navbar/navbar.module';
import { FormBuilderEffects } from './_store/effects/form-builder.effects';
import { MatSelectModule } from '@angular/material/select';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ContentTypeInterceptor } from './_helpers/content-type.interceptor';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ContentTypeInterceptor,
    multi: true
  }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AuthenticationModule,
    EffectsModule.forRoot([FormBuilderEffects, AuthenticationEffects]),
    StoreModule.forRoot(reducers),
    StoreModule.forFeature(authenticationFeatureName, reducers.authenticationReducer),
    StoreModule.forFeature(formBuilderFeatureName, reducers.formBuilderReducer),
    NavbarModule
  ],
  providers: [AuthenticationGuard, JwtInterceptor, ContentTypeInterceptor, interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
