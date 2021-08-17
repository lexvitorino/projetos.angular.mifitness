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

      const snapshot = await this.storage.getUser();
      if (snapshot && snapshot.name) {
        this.storage.setName(snapshot.name);
      }

      this.router.navigate(['/starterDias'])
    } catch (error) {
      alert("Verifique os dados e tente novamente!");
    } finally {
      this.loading = false;
    }
  }

}
