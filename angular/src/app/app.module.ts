import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoriesComponent } from './component/stories/stories.component';
import { CommonModule } from '@angular/common';
import { StoryFormComponent } from './component/stories/story-form/story-form.component';
import { ChildrenBookListComponent } from './component/books/children-book-list/children-book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    StoryFormComponent,
    ChildrenBookListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }