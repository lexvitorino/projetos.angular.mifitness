import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStaterModule } from './pages/app-starter/app-starter.module';
import { AppTabModule } from './pages/app-tab/app-tab.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppStaterModule,
    AppTabModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
