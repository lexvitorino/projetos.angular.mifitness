import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(private http: HttpClient) { }

  public getPresetWorkouts(): Observable<any> {
    return this.http.get('assets/presets/presetWorkouts.json');
  }

}
