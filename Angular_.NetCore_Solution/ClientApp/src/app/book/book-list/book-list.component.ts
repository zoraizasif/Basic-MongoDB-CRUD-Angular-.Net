import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  public books: Book[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { this.getAll(); }

  getAll() {
    this.http.get<Book[]>(this.baseUrl + 'book/get-all').subscribe(result => {
      this.books = result;
    }, error => console.error(error));
  }

  delete_onClick(id: string) {
    const canDelete = confirm("Are you sure you want to delete?");
    if (canDelete) {
      this.http.delete(this.baseUrl + `book/delete/${id}`).subscribe(result => {
        console.log('update', { result });
        if (result) location.reload();
      },
        error => console.error(error))
    }
  }
}
