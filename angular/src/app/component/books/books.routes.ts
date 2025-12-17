import { Routes } from '@angular/router';
import { ChildrenBookListComponent } from './children-book-list/children-book-list.component';
import { ChildrenBookFormComponent } from './children-book-form/children-book-form.component';


export const routes: Routes = [
    { path: '', component: ChildrenBookListComponent },
    { path: 'new', component: ChildrenBookFormComponent }
];