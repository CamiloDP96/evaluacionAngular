import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMovieComponent } from './create-new-movie.component';

describe('CreateNewMovieComponent', () => {
  let component: CreateNewMovieComponent;
  let fixture: ComponentFixture<CreateNewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
