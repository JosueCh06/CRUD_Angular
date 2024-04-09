import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiserrviceService, Author} from '../apiserrvice.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserrviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  author:Author={
    cod_autor:0,
    nom_autor:'', 
    ape_autor:'',
    hijos_autor:0,
  };

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
          console.log(res, 'res==>');
          this.author = res;
      });
    }
  }

  userForm = new FormGroup({
    'nom_autor': new FormControl('', Validators.required),
    'ape_autor': new FormControl('', Validators.required),
    'hijos_autor': new FormControl('', Validators.required)
  });

  //create user
  userSubmit(){
    if(this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log('res==>', res);
        this.userForm.reset();
        this.successmsg = 'Added author!!';
      })
    }
    else
    {this.errormsg = 'all field is requerid!!'}
  }

  // updatedata
  userUpdate()
  {
      console.log(this.userForm.value,'updateform');

      if(this.userForm.valid)
      {
        this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
          console.log(res,'resultupdated');
          this.successmsg = 'Updated author!!';
        });
      }
      else{this.errormsg = 'all field is requerid';}
  }

}
