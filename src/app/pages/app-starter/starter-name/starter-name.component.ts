import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';

@Component({
  selector: 'app-starter-name',
  templateUrl: './starter-name.component.html',
  styleUrls: ['./starter-name.component.scss'],
  providers: [TitleCasePipe]
})
export class StarterNameComponent implements OnInit {

  public name: string;

  constructor(
    private titleCasePipe: TitleCasePipe,
    private router: Router,
    public storage: StorageService
  ) {

  }

  ngOnInit(): void {
  }

  onClick() {}

  onBlur() {
    this.name = this.titleCasePipe.transform(this.name);
  }

  onNext() {
    if (!this.name) {
      alert("Eu sei que você tem um nome!");
      return;
    }

    this.storage.setName(this.name);
    this.router.navigate(['/starterDias']);
  }

}
