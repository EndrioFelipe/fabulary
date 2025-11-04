import { MatButtonModule } from '@angular/material/button';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter } from '@angular/router';
import { UserGuard } from './core/guards/authUser/user.guard';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { NoAuthGuard } from './core/guards/noAuth/no-auth.guard';
import { AccessComponent } from './features/access/access.component';
import { HelloComponent } from './features/hello/hello.component';
import { LandingComponent } from './app/component/landing/landing.component';
import { StoryFormComponent } from './app/component/stories/story-form/story-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },     
    { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
    { path: 'stories', loadChildren: () => import('./app/component/stories/stories.routes').then(m => m.routes) },
    { path: 'stories/new', component: StoryFormComponent },
    { path: 'signup', component: RegisterComponent,canActivate:[UserGuard] },
    { path: 'access', component: AccessComponent,canActivate:[UserGuard] },
    { path: 'login', component: LoginComponent,canActivate:[NoAuthGuard] },
    { path: 'hello', component: HelloComponent, canActivate:[UserGuard] },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, ReactiveFormsModule, FormsModule,
                   MatFormFieldModule, MatInputModule, MatButtonModule),
        AuthService, [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.error(err));

    
