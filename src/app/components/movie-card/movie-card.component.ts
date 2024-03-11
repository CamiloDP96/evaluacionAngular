import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit{
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService
  ){}

  ngOnInit(): void {
      this.movieService.obtenerDatos().subscribe(
        (data: Movie[]) => [
          this.movies = data
        ]
      );
  }

}
