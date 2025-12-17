import { Routes } from '@angular/router';
import { StoriesComponent } from './stories.component';
import { StoryFormComponent } from './story-form/story-form.component';
import { ReadStoryComponent } from './read-story/read-story.component';


export const routes: Routes = [
  { path: '', component: StoriesComponent },
  { path: 'new', component: StoryFormComponent },
  { path: 'read/:id', component: ReadStoryComponent }
];