import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Article } from '../models/article';
import { ArticlesService } from '../service/articles.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css'],
})
export class ArticleFormComponent implements OnInit {
  pageTitle: string;
  articleForm = new FormGroup({
    title: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.maxLength(100)])
    ),
    author: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  article: Article = new Article();

  constructor(
    private articleService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit article';
      this.articleService.get(id).subscribe((article: Article) => {
        this.article = article;
        this.fillForm(article);
      });
    } else {
      this.pageTitle = 'Create article';
      this.article = new Article();
    }
  }

  fillForm(article: Article): void {
    this.articleForm.patchValue({
      title: article.title,
      content: article.content,
      author: article.author,
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      this.article.title = this.articleForm.value.title;
      this.article.content = this.articleForm.value.content;
      this.article.author = this.articleForm.value.author;
      if(!this.article.id) {
        this.article.publishDate = new Date().toISOString();
      }

      const observableService = this.article.id
        ? this.articleService.update(this.article.id, this.article)
        : this.articleService.create(this.article);
      observableService
        .pipe(catchError((err) => throwError(err)))
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
