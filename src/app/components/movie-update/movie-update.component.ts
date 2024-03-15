import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css']
})
export class MovieUpdateComponent implements OnInit {

  updateMovieForm!: FormGroup;
  selectedMovie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadMovieById(id);
      }
    });
    this.updateMovieForm = this.formBuilder.group({
      id: [''],
      title: [''],
      original_title: [''],
      original_title_romanised: [''],
      description: [''],
      director: [''],
      producer: [''],
      release_date: ['', [Validators.pattern(/^-?\d+$/), Validators.min(1600), Validators.max(2500)]],
      running_time: ['', [Validators.pattern(/^-?\d+$/), Validators.min(0), Validators.max(5000)]],
      rt_score: ['', [Validators.pattern(/^-?\d+$/), Validators.min(0), Validators.max(100)]],
    });
  }

  loadMovieById(id: string): void {
    this.movieService.getMovieById(id).subscribe(
      (movie: Movie) => {
        this.selectedMovie = movie;
        // Populate the form with the movie data, including the id
        this.updateMovieForm.patchValue({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          original_title_romanised: movie.original_title_romanised,
          description: movie.description,
          director: movie.director,
          producer: movie.producer,
          release_date: movie.release_date,
          running_time: movie.running_time,
          rt_score: movie.rt_score
        });
      },
      error => {
        console.error('Error fetching movie:', error);
        // Handle error appropriately
      }
    );
  }

  updateMovie(): void {
    console.log('Form value:', this.updateMovieForm.value);
    alert('Update movie submitted');
    if (this.updateMovieForm.valid && this.selectedMovie) {
      const updatedMovie: Movie = this.updateMovieForm.value;
      // Keep the same ID for the updated movie
      updatedMovie.id = this.selectedMovie.id;
      // Update the movie in local storage
      this.movieService.updateMovie(updatedMovie).subscribe(
        (updated: Movie) => {
          console.log('Movie updated:', updated);
          // Optionally, you can reset the form after updating the movie
          this.updateMovieForm.reset();
        },
        error => {
          console.error('Error updating movie:', error);
          // Handle error appropriately
        }
      );
    } else {
      console.error('Form is invalid. Cannot update movie.');
      // Handle invalid form state
    }
  }
}