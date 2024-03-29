import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewMovieComponent } from './components/create-new-movie/create-new-movie.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { HomeComponent } from './components/home/home.component';
import { MovieUpdateComponent } from './components/movie-update/movie-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'newmovie',
    component: CreateNewMovieComponent
  },
  {
    path: 'movies',
    component: MovieCardComponent
  },
  {
    path: 'update',
    component: MovieUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
