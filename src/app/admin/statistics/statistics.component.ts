import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/service/articles.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  lastWeekArticles: Article[];
  currentDate = new Date();

  statisticsByDate: { date: string; total: number }[] = [];
  constructor(private articleService: ArticlesService) {}
  ngOnInit(): void {
    [...Array(7)].forEach((_, i) => {
      const d = new Date();
      const pastDate = this.currentDate.getDate() - i;
      d.setDate(pastDate);
      this.statisticsByDate.push({
        date: d.toISOString(),
        total: 0,
      });
    });
    const dateFrom =
      this.statisticsByDate[this.statisticsByDate.length - 1].date;
    const dateTo = new Date().toISOString();
    this.articleService
      .getByDate(dateFrom, dateTo)
      .subscribe((articles: Article[]) => {
        this.lastWeekArticles = articles;
        articles.forEach((article: Article) => {
          const publishDate = new Date(article.publishDate);
          const index = this.statisticsByDate.findIndex(stat => {
            const statDate = new Date(stat.date);
            console.log(statDate)
            console.log(publishDate)
            return publishDate.getDate() === statDate.getDate()
          })
          this.statisticsByDate[index].total++;
        })
      });
  }
}
