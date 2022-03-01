import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Summary } from './shared/model/summary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  readonly API_URL = 'http://teste/'

  constructor(private httpClient: HttpClient){}

  public getSummaryForGivenUser(userId: number): Observable<Summary> {
    const options = { 
      params: {
        userId : String(userId)
      }
    }
    return this.httpClient.get<Summary>(`${this.API_URL}getUserSummary/`, options)
  }

}
