import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() cValue;
@Input() dValue;
  closeResult: string;
  name = '';
  mr;
  phone: number;
  httpOptions;
  contacts;
  // contacts = [ {
  //   name: 'Rajat',
  //   phone: 8003650500
  // }, {
  //   name: 'Amit',
  //   phone: 7065502855
  // }, {
  //   name: 'Nitish',
  //   phone: 9413686335
  // }, {
  //   name: 'Nitin',
  //   phone: 8505019814
  // }, {
  //   name: 'Gaurav',
  //   phone: 8387082049
  // }];
  search;
  constructor(private http: HttpClient, private router: Router, private modal: NgbModal) {

   }

  ngOnInit() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') })
    };
    this.http.get('http://localhost:4000/showAll', this.httpOptions).subscribe((allCOntacts: any) => {
      // console.log(allCOntacts.data)
      if ( allCOntacts.success ) {
        this.contacts = allCOntacts.data.contact;
      } else {
        alert(allCOntacts.msg);
      }
    })
  }
  open(content) {
    this.mr = this.modal.open(content);
    this.mr.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  add() {
    this.httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') })
    };
    this.http.post('http://localhost:4000/addContact', {name: this.name, phone: this.phone}, this.httpOptions).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.name = '';
        this.phone = undefined;
        this.mr.close('close');
        this.http.get('http://localhost:4000/showAll', this.httpOptions).subscribe((allCOntacts: any) => {
      console.log(allCOntacts);
      if (allCOntacts.success) {
        this.contacts = allCOntacts.data.contact;
      } else {
        alert(allCOntacts.msg);
      }
    });
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
