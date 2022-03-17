import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonetaryValueComponent } from './monetary-value/monetary-value.component';
import { SummaryComponent } from './summary/summary.component';
import { FakeBackendInterceptor } from './interceptors/fake-backend';
import { httpInterceptorProviders } from './interceptors/interceptors-provider';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MonetaryValueComponent,
    SummaryComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
