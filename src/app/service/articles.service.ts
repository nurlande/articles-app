import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})

export class ArticlesService {
  private baseUrl = 'http://localhost:3000/articles';

  constructor(private http: HttpClient) {}
  getAll(page: number, limit: number): Observable<Article[]> {
    const options = { params: new HttpParams({fromString: `_page=${page}&_limit=${limit}`}) };
    return this.http.get<any>(this.baseUrl, options);
  }

  getByDate(dateFrom: string, dateTo: string): Observable<Article[]> {
    const options = { params: new HttpParams({fromString: `publishDate_gte=${dateFrom}&publishDate_lte=${dateTo}`}) };
    return this.http.get<any>(this.baseUrl, options);
  }

  get(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + id);
  }
  create(article: Article) {
    return this.http.post<any>(this.baseUrl, article);
  }
  update(id: string, article: Article): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + id, article);
  }
  delete(id: string) {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }
}
