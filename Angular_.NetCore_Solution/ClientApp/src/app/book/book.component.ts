import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  public books: Book[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { this.getAll(); }

  getAll() {
    this.http.get<Book[]>(this.baseUrl + 'book/get-all').subscribe(result => {
      this.books = result;
    }, error => console.error(error));
  }

}
