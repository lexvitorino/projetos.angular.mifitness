import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarterDiasComponent } from './pages/app-starter/starter-dias/starter-dias.component';
import { StarterNameComponent } from './pages/app-starter/starter-name/starter-name.component';
import { StarterNivelComponent } from './pages/app-starter/starter-nivel/starter-nivel.component';
import { StarterRecommendationsComponent } from './pages/app-starter/starter-recommendations/starter-recommendations.component';
import { AppTabComponent } from './pages/app-tab/app-tab.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'starterName', component: StarterNameComponent },
  { path: 'starterDias', component: StarterDiasComponent },
  { path: 'starterNivel', component: StarterNivelComponent },
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
