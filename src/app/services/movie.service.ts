import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'https://ghibliapi.vercel.app/films';
  private localStorageKey = 'movies';

  constructor(
    private http: HttpClient,
  ) { }

  // GET
  obtenerDatos(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  obtenerDatoPorTitulo(titulo: string): Observable<Movie[]> {
    const params = new HttpParams().set('title', titulo);
    return this.http.get<Movie[]>(this.baseUrl, { params });
  }

  getAllMovies(): Observable<Movie[]> {
    return of(JSON.parse(localStorage.getItem(this.localStorageKey) || '[]'));
  }

  getMovieByTitle(title: string): Observable<Movie> {
    let movies: Movie[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    let movie: Movie | undefined = movies.find(movie => movie.title === title);
    if (movie) {
      return of(movie);
    } else {
      return throwError(new Error("Movie not found"));
    }
  }

  getMovieById(id: string): Observable<Movie> {
    let movies: Movie[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    let movie: Movie | undefined = movies.find(movie => movie.id === id);
    if (movie) {
      return of(movie);
    } else {
      return throwError(new Error("Movie not found"));
    }
  }

  createMovie(movie: Movie): Observable<Movie> {
    let movies: Movie[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    movies.push(movie);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    return of(movie);
}

updateMovie(updatedMovie: Movie): Observable<Movie> {
  let movies: Movie[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  let index = movies.findIndex(movie => movie.id === updatedMovie.id);
  if (index !== -1) {
    movies[index] = updatedMovie;
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }
  return of(updatedMovie);
}

  // Delete a movie from local storage
  deleteMovie(id: string): Observable<void> {
    let movies: Movie[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    let index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
      movies.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    }
    return of(undefined);
  }
}
