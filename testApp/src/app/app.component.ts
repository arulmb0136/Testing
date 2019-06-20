import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'testApp';
  searchString;
  Data=[];
  pageNo=1;
  size=9;

  constructor(private service: ServiceService) {
    let data={
      pageNo:this.pageNo,
      size:this.size
    }
    this.service.findData(data).subscribe((data :any)=>{
      console.log(data);
      this.Data= data.message;
    });
 
  }
  onScroll(){
    this.pageNo=this.pageNo+1;
    // this.size = this.size+6;
    let data={
      pageNo:this.pageNo,
      size:this.pageNo
    }
    this.service.findData(data).subscribe((data :any)=>{
      for(let i=0;i<data.message.length;i++){
        this.Data.push(data.message[i]);
      }
    });
  }
  searchNow(){
  }
}
