import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class NotifiedReportsService {
  apiUrl: string = environment.apiUrl + '/notifiedreports';
  constructor(private http: HttpClient) {}

  
}
