import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieService } from './services/movie.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
  ],
  providers: [
    MovieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
