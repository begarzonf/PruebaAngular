import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {

  var1 = "Bearer " + localStorage.getItem("token")
  httpOptions = {
  headers: new HttpHeaders({
    'Authorization': this.var1
  })
};

  constructor(
    private _http: HttpClient,
    private router: Router
  ) { 
  }

  popUpOpen = false;
  arrProduct: any = {}

  openPopUp(item) {

    this.popUpOpen = true;
    this.arrProduct = item
  }

  deleteOption() {
    this.popUpOpen = false;
  }

  cancelOption() {
    this.popUpOpen = false;
  }

  pageNumber: number
  arrProducts = []
  FilteredProducts = []
  api_url: string = "https://www.wonapp.co/products?page="
  api_urlSearch: string = "https://www.wonapp.co/products/filter?name="
  stringSearchR: string = ""
  stringSearchL: string = ""


  logOut() {
    localStorage.setItem("token", "-1")
    this.router.navigate(['/']);
  }

  goBack() {
    this.arrProducts = []
    this.FilteredProducts = [];
    let api_url2 = this.api_url + String(this.pageNumber)
    this._http.get(api_url2, this.httpOptions).subscribe(
      (Response: any) => {
        for (let i = 0; i < Response.data.length; i++) {
          this.arrProducts.push(Response.data[i])
        }
        this.FilteredProducts = this.arrProducts;
      }
    )
  }

  remoteSearch() {
    this.arrProducts = []
    this.FilteredProducts = [];
    if (this.stringSearchR == "") {
      this.goBack();
      return;
    }
    let api_urlSearch2 = this.api_urlSearch + this.stringSearchR
    this._http.get(api_urlSearch2, this.httpOptions).subscribe(
      (Response: any) => {
        for (let i = 0; i < Response.data.length; i++) {
          this.arrProducts.push(Response.data[i])
        }
        this.FilteredProducts = this.arrProducts;
      }
    )
  }

  localSearch() {
    this.FilteredProducts = [];
    for (let n = 0; n < this.arrProducts.length; n++) {
      let item = this.arrProducts[n];
      if (item.name.toLowerCase().includes(this.stringSearchL.toLowerCase())) {
        this.FilteredProducts.push(item);
      }
    }
  }



  prevPage() {
    if (this.pageNumber > 1) {
      this.arrProducts = []
      this.pageNumber--
      localStorage.setItem("number", String(this.pageNumber))
      let api_url2 = this.api_url + String(this.pageNumber)
      this._http.get(api_url2, this.httpOptions).subscribe(
        (Response: any) => {
          for (let i = 0; i < Response.data.length; i++) {
            this.arrProducts.push(Response.data[i])
          }
          this.FilteredProducts = this.arrProducts;
        }
      )
    } else {
      this.pageNumber = 1
    }
  }

  nextPage() {
    this.arrProducts = []
    this.pageNumber++
    localStorage.setItem("number", String(this.pageNumber))
    let api_url2 = this.api_url + String(this.pageNumber)
    this._http.get(api_url2, this.httpOptions).subscribe(
      (Response: any) => {
        for (let i = 0; i < Response.data.length; i++) {
          this.arrProducts.push(Response.data[i])
        }
        this.FilteredProducts = this.arrProducts;
      }
    )
  }

  ngOnInit(): void {
    this.pageNumber = Number(localStorage.getItem("number"))
    this.arrProducts = []
    let api_url2 = this.api_url + String(this.pageNumber)
    this._http.get(api_url2, this.httpOptions).subscribe(
      (Response: any) => {
        for (let i = 0; i < Response.data.length; i++) {
          this.arrProducts.push(Response.data[i])
        }
        this.FilteredProducts = this.arrProducts;
      }
    )
  }

}
