import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import {ApiserrviceService} from '../apiserrvice.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserrviceService) { }

  readData:any;
  successmsg:any;
  

  ngOnInit(): void {
    this.getAllData();
  }

  // getDeleted
  deleteId(id:any)
  {
    console.log('deleteid=>');
    this.service.deleteData(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res;
      this.getAllData();
    });
  }

  //getData
  getAllData(){
    this.service.getAllData().subscribe((res)=>{
      console.log("res==>", res);
      this.readData = res;
  });
  }


}
