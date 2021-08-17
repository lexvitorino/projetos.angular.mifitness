import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-nivel',
  templateUrl: './starter-nivel.component.html',
  styleUrls: ['./starter-nivel.component.scss']
})
export class StarterNivelComponent implements OnInit {

  public data: any;

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  async ngOnInit() {
    const snapshot = await this.storage.getUser();
    this.data = {};
    if (snapshot) {
      this.data = snapshot;
    }
  }

  onNext() {
    if (!this.data.level) {
      alert("Você precisa escolher um nível!");
      return;
    }

    this.storage.setLevel(this.data.level);
    this.router.navigate(['/starterRecommendations']);
  }

  get funnyPhrase(): string {
    const quality = !!this.data ? this.data.days.length : 0;
    switch (quality) {
      case 1:
        return "Só 1 dia não vai adiantar muito, mas...";
      case 2:
        return "2 dias eu acho pouco, mas quem sou eu pra te julgar?";
      case 3:
        return "Legal, 3 dias dá pro  gasto...";
      case 4:
        return "Legal, 4 dias vai ser TOP!";
      case 5:
        return "É isso ai, 5 dias é o mínimo, lets GO!";
      case 6:
        return "É, 6 dias não é pra todo mundo!";
      case 7:
        return "Wooow! Todo dia?! WTF!?";
      case 0:
        return "";
    }
  }

}
