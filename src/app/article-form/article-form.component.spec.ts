import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { ArticleFormComponent } from './article-form.component';

describe('ArticleFormComponent', () => {
  let component: ArticleFormComponent;
  let fixture: ComponentFixture<ArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
