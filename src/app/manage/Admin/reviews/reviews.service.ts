import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Reviews } from './reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getReview(): Observable<Reviews[]> {

    return this.httpClient.get<any>(ApiService.getReviewsListURL);
  }
  updateRating(admin: Reviews): Observable<any> {

    return this.httpClient.post<any>(ApiService.updatereviewsURL, admin);
  }
  removeRating(id:any) {

    return this.httpClient.get<any>(ApiService.removeReviewsURL + id);

  }

}


