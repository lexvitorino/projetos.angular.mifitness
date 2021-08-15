import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/components/shared.module';
import { StarterDiasComponent } from './starter-dias/starter-dias.component';
import { StarterNameComponent } from './starter-name/starter-name.component';
import { StarterNivelComponent } from './starter-nivel/starter-nivel.component';
import { StarterRecommendationsComponent } from './starter-recommendations/starter-recommendations.component';

@NgModule({
  declarations: [
    StarterNameComponent,
    StarterDiasComponent,
    StarterNivelComponent,
    StarterRecommendationsComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class AppStaterModule { }
