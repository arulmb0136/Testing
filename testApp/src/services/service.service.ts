import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }
  findData(data){
    let params={
      pageNo:data.pageNo,
      size:data.size
    }
    return this.httpClient.get('http://localhost:4001/getDataByPage',{params:params});
  }
}
