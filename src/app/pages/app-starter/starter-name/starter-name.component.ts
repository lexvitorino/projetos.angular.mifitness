import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-name',
  templateUrl: './starter-name.component.html',
  styleUrls: ['./starter-name.component.scss']
})
export class StarterNameComponent implements OnInit {

  public name: string;
  public email: string;
  public loading: boolean = false;

  constructor(
    private router: Router,
    public storage: StorageService
  ) {

  }

  ngOnInit(): void {
    this.email = this.storage.email;
  }

  onClick() { }

  async onNext() {
    if (!this.email) {
      alert("Precisamos do seu email!");
      return;
    }

    this.storage.setEmail(this.email);

    try {
      this.loading = true;

      const signIn = await this.storage.signIn();

      this.storage.setId(signIn.user.uid);

      const snapshot = await this.storage.getUser(true);
      if (snapshot && snapshot.name) {
        this.storage.setName(snapshot.name);
      }

      if (!snapshot.days || snapshot.days.length === 0) {
        this.router.navigate(['/starterDias'])
      } else if (!snapshot.level) {
        this.router.navigate(['/starterNivel'])
      } else if (!snapshot.myWorkouts || snapshot.myWorkouts.length === 0) {
        this.router.navigate(['/starterRecommendations'])
      } else {
        this.router.navigate(['/appTab']);
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("Usuário não existe!");
      } else {
        alert("Verifique os dados e tente novamente!");
      }
    } finally {
      this.loading = false;
    }
  }

}
