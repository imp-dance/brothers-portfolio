import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticlePostComponent } from './article-post/article-post.component';
import { FooterComponent } from './footer/footer.component';
import { getPostListService } from './get-post-list.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ArticlesComponent,
    ArticlePostComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [getPostListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
