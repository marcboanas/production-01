import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './pages/callback/callback.component';

import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './core/api.service';
import { LoadingComponent } from './core/loading.component';

import { DatePipe } from '@angular/common';
import { UtilsService } from './core/utils.service';

import { FormsModule } from '@angular/forms';

import { FilterSortService } from './core/filter-sort.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CallbackComponent,
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  	Title,
    AuthService,
    ApiService,
    DatePipe,
    UtilsService,
    FilterSortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
