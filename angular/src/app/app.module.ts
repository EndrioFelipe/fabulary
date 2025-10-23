import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StoriesComponent } from './app/component/stories/stories.component';
import { CommonModule } from '@angular/common';
import { StoryFormComponent } from './app/component/story-form/story-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    StoryFormComponent
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