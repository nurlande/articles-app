import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { ArticlesService } from '../service/articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  removedMessage: string;

  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) {}

  page: number = 1;
  limit: number = 2;

  ngOnInit(): void {
    this.loadData(this.page)
  }

  loadData(page: number) {
    this.articleService
      .getAll(page, this.limit)
      .subscribe((articles: Article[]) => {
        this.articles = articles;
      });
  }

  onPrev() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.loadData(this.page);
    }
  }

  onNext() {
    if (this.articles.length === this.limit) {
      this.page = this.page + 1;
      this.loadData(this.page);
    }
  }

  onCreate() {
    this.router.navigate(['create-article']);
  }

  onEdit(id: string) {
    console.log(id);
    this.router.navigate([`edit-article/${id}`]);
  }

  onDelete(id: string) {
    console.log(id);
    if (confirm('Are you sure to remove this article') == true) {
      this.articleService.delete(id).subscribe(() => {
        this.removedMessage = `Article with id ${id} removed`;
        this.articles = this.articles.filter(
          (article: Article) => article.id !== id
        );
      });
    }
  }
}
