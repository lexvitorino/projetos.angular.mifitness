import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/components/shared.module';
import { StarterDiasComponent } from './starter-dias/starter-dias.component';
import { StarterNameComponent } from './starter-name/starter-name.component';
import { StarterNivelComponent } from './starter-nivel/starter-nivel.component';
import { StarterRecommendationsComponent } from './starter-recommendations/starter-recommendations.component';
import { StarterSignoutComponent } from './starter-signout/starter-signout.component';

@NgModule({
  declarations: [
    StarterNameComponent,
    StarterDiasComponent,
    StarterNivelComponent,
    StarterRecommendationsComponent,
    StarterSignoutComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class AppStaterModule { }
