import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'https://ghibliapi.vercel.app/films';

  constructor(
    private http: HttpClient,
  ) { }

  // GET
  obtenerDatos(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}`);
  }

  obtenerDatoPorId(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/${id}`);
  }
}
