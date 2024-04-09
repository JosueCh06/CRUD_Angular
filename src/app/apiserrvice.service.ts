import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserrviceService {

  constructor(private _http:HttpClient) {}

  // connect frontend to backend
  apiUrl = 'http://localhost:3005/api/authors';

  // get all data
  getAllData()
  {
    return this._http.get(`${this.apiUrl}`);
  }

  // create data
  createData(author: Author)
  {
    console.log(author, 'createAuthor==>');
    return this._http.post(`${this.apiUrl}`, author);
  }

  //delete data
  deleteData(cod_autor:number)
  {
    let id = cod_autor;
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  //update data
  updateData(author: Author, cod_autor:number)
  {
    let id = cod_autor;
    return this._http.put(`${this.apiUrl}/${id}`,author);
  }

  //getSingleData
  getSingleData(cod_autor:number)
  {
    let id = cod_autor;
    return this._http.get(`${this.apiUrl}/${id}`);
  }
}

export interface Author{
  cod_autor?:number;
  nom_autor?:string; 
  ape_autor?:string;
  hijos_autor?:number;
}
