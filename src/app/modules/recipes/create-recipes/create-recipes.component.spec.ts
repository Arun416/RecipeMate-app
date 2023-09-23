import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipesComponent } from './create-recipes.component';

describe('CreateRecipesComponent', () => {
  let component: CreateRecipesComponent;
  let fixture: ComponentFixture<CreateRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecipesComponent]
    });
    fixture = TestBed.createComponent(CreateRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
