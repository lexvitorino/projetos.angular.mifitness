import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppActivate } from './app.active';
import { StarterDiasComponent } from './pages/app-starter/starter-dias/starter-dias.component';
import { StarterNameComponent } from './pages/app-starter/starter-name/starter-name.component';
import { StarterNivelComponent } from './pages/app-starter/starter-nivel/starter-nivel.component';
import { StarterRecommendationsComponent } from './pages/app-starter/starter-recommendations/starter-recommendations.component';
import { StarterSignoutComponent } from './pages/app-starter/starter-signout/starter-signout.component';
import { TabWorkoutChecklistComponent } from './pages/app-tab/tab-workout-checklist/tab-workout-checklist.component';
import { TabWorkoutComponent } from './pages/app-tab/tab-workout/tab-workout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent, canActivate: [AppActivate] },
  { path: 'starterSignout', component: StarterSignoutComponent },
  { path: 'starterName', component: StarterNameComponent },
  { path: 'starterDias', component: StarterDiasComponent },
  { path: 'starterNivel', component: StarterNivelComponent },
  { path: 'workout', component: TabWorkoutComponent },
  { path: 'workoutChecklist/:workout', component: TabWorkoutChecklistComponent },
  { path: 'starterRecommendations', component: StarterRecommendationsComponent },
  { path: 'appTab', loadChildren: () => import('./pages/app-tab/app-tab.module').then(mod => mod.AppTabModule) },
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
