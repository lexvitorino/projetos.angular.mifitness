import { User } from './../../../models/user.interface';
import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-signout',
  templateUrl: './starter-signout.component.html',
  styleUrls: ['./starter-signout.component.scss'],
  providers: [TitleCasePipe]
})
export class StarterSignoutComponent implements OnInit {

  public name: string;
  public email: string;
  public loading: boolean = false;

  constructor(
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    public storage: StorageService
  ) {

  }

  ngOnInit(): void {
  }

  onClick() { }

  onBlur() {
    this.name = this.titleCasePipe.transform(this.name);
  }

  async onNext() {
    if (!this.name) {
      alert("Eu sei que você tem um nome!");
      return;
    } else if (!this.email) {
      alert("Precisamos do seu email!");
      return;
    }

    this.storage.setName(this.name);
    this.storage.setEmail(this.email);

    try {
      this.loading = true;
      const signIn = await this.storage.signOut();
      this.storage.user = {} as User;
      this.storage.setId(signIn.user.uid);
      this.storage.setUserNameEEmail(this.name, this.email);
      alert("Cadastro realizado com sucesso!");
      this.router.navigate(['/starterDias']);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("E-mail já cadastrado!");
      } else {
        alert("Verifique os dados e tente novamente!");
        console.log(error);
      }
    } finally {
      this.loading = false;
    }
  }

}
