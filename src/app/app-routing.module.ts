import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';

const routes: Routes = [
  {
    component: ArticleListComponent,
    path: 'article-list'
  },
  {
    component: ArticleFormComponent,
    path: 'create-article'
  },
  {
    component: ArticleFormComponent,
    path: 'edit-article/:id'
  },
  {
    component: StatisticsComponent,
    path: 'admin/statistics'
  },
  {
    path: '',
    redirectTo: 'article-list',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
