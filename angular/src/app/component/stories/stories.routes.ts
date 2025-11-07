import { Routes } from '@angular/router';
import { StoriesComponent } from './stories.component';
import { StoryFormComponent } from './story-form/story-form.component';


export const routes: Routes = [
  { path: '', component: StoriesComponent },
  { path: 'new', component: StoryFormComponent }
];