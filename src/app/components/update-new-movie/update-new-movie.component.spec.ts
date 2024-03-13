import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewMovieComponent } from './update-new-movie.component';

describe('UpdateNewMovieComponent', () => {
  let component: UpdateNewMovieComponent;
  let fixture: ComponentFixture<UpdateNewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNewMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateNewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
