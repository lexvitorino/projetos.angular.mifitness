import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-nivel',
  templateUrl: './starter-nivel.component.html',
  styleUrls: ['./starter-nivel.component.scss']
})
export class StarterNivelComponent implements OnInit {

  constructor(
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {

  }

  onNext() {
    if (!this.storage.level) {
      alert("Você precisa escolher um nível!");
      return;
    }

    this.router.navigate(['/starterRecommendations']);
  }

}
