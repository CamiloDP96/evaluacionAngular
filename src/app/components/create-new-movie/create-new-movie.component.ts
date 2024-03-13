import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';


@Component({
  selector: 'app-create-new-movie',
  templateUrl: './create-new-movie.component.html',
  styleUrls: ['./create-new-movie.component.css']
})
export class CreateNewMovieComponent implements OnInit{

  newMovieForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private movieService: MovieService
  ){
  }

  ngOnInit():void{
    this.newMovieForm = this.formBuilder.group({
      id: [this.generateRandomId(), Validators.required],
      title: ['', Validators.required],
      original_title: ['', Validators.required],
      original_title_romanised: ['', Validators.required],
      description: ['', Validators.required],
      director: ['', Validators.required],
      producer: ['', Validators.required],
      release_date: ['', [Validators.required, Validators.pattern(/^-?\d+$/), Validators.min(1600), Validators.max(2500)]], // Place min and max validators within the array
  running_time: ['', [Validators.required, Validators.pattern(/^-?\d+$/), Validators.min(0), Validators.max(5000)]], // Place min and max validators within the array
  rt_score: ['', [Validators.required, Validators.pattern(/^-?\d+$/), Validators.min(0), Validators.max(100)]], // Place min and max validators within the array
    })
  }

  generateRandomId(): string {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  onSubmit() {
    alert('new movie submited');
    if (this.newMovieForm.valid) {
      const newMovie: Movie = this.newMovieForm.value;
      this.movieService.createMovie(newMovie).subscribe(
        (createdMovie: Movie) => {
          console.log('Movie created:', createdMovie);
          // Optionally, you can reset the form after saving the movie
          this.newMovieForm.reset();
        },
        error => {
          console.error('Error creating movie:', error);
        }
      );
    } else {
      console.error('Form is invalid. Cannot submit.');
    }
  }

}
function uuidv4(): any {
  throw new Error('Function not implemented.');
}

