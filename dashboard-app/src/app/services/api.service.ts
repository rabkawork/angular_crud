import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl);
  }

  getById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/${id}`);
  }


  create(data: Data): Observable<HttpResponse<Data>> {
    return this.http.post<Data>(this.apiUrl, data, { observe: 'response' });
  }

  // Update method with full response observation
  update(id: number, data: Data): Observable<HttpResponse<Data>> {
    return this.http.put<Data>(`${this.apiUrl}/${id}`, data, { observe: 'response' });
  }

  
  delete(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
  
}