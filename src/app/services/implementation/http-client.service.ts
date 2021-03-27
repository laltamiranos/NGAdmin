import { Injectable } from '@angular/core';
import { HttpClient as Http } from '@angular/common/http';
import { ConfigService } from 'src/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  headers: any;

  constructor(
    private http: Http,
    private config: ConfigService
  ) {
    this.config.headers.subscribe((headers) => {
      if (headers) {
        this.headers = headers
      }
    });
  }

  get(url) {
    return this.http.get(url, { headers: this.headers });
  }

  post(url, data) {
    return this.http.post(url, data, { headers: this.headers });
  }

  put(url, data) {
    return this.http.put(url, data, { headers: this.headers });
  }

  delete(url) {
    return this.http.delete(url, { headers: this.headers });
  }
}
