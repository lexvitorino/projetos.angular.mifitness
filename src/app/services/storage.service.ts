import { Injectable } from '@angular/core';
import { FireDatabaseService } from './databases/fire.database.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends FireDatabaseService {

  async login() {
    return await this.signIn();
  }

  isBeginner(level: string): boolean {
    return level === 'beginner';
  }

  isIntermediate(level: string): boolean {
    return level === 'intermediate';
  }

  isAdvanced(level: string): boolean {
    return level === 'advanced';
  }

}
