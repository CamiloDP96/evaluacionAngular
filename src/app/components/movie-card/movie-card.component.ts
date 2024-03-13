import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit{
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchQuery: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.filterMovies();
  }

  filterMovies(): void {
    if (this.searchQuery) {
      forkJoin({
        movieByTitle: this.movieService.getMovieByTitle(this.searchQuery),
        moviesByTitle: this.movieService.obtenerDatoPorTitulo(this.searchQuery)
      }).subscribe(
        ({ movieByTitle, moviesByTitle }) => {
          // Handle response for movieByTitle
          this.movies = [movieByTitle];
          this.filteredMovies = [movieByTitle];

          // Handle response for moviesByTitle
          // Note: If moviesByTitle returns multiple movies, you may need to decide how to handle them
          // For now, we'll just set the movies and filteredMovies to the first movie in the array
          if (moviesByTitle.length > 0) {
            this.movies = moviesByTitle;
            this.filteredMovies = moviesByTitle;
          }
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
    } else {
      forkJoin({
        allMovies: this.movieService.getAllMovies(),
        datosMovies: this.movieService.obtenerDatos()
      }).subscribe(
        ({ allMovies, datosMovies }) => {
          // Handle response for allMovies
          this.movies = allMovies;
          this.filteredMovies = allMovies;

          // Handle response for datosMovies
          // Assuming you want to merge the movies received from datosMovies with the existing movies
          // You can use the spread operator to merge the arrays
          this.movies = [...this.movies, ...datosMovies];
          this.filteredMovies = [...this.filteredMovies, ...datosMovies];
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
    }
  }

  deleteMovie(id: string): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(
        () => {
          console.log('Movie deleted successfully');
          alert('Movie deleted successfully'); // Show advertising message
          // Optionally, you can update the list of movies after deletion
          // For example, you can fetch the updated list of movies again
          // Or remove the deleted movie from the existing list
        },
        error => {
          console.error('Error deleting movie:', error);
          alert('An error occurred while deleting the movie. Please try again later.'); // Show error message
          // Handle error appropriately, e.g., show error message to the user
        }
      );
    }
  }
}
