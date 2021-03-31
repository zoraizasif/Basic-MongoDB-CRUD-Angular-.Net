import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './book-upsert.component.html',
  styleUrls: ['./book-upsert.component.css']
})
export class BookUpsertComponent implements OnInit {

  public bookForm: FormGroup;
  public book: Book;
  public isSubmitClicked = false;
  public bookId: number | null = null;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      ssn: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(params => this.bookId = params.id ? params.id: null);
    if (this.bookId) {
      await this.getBook();
      this.patchBookForm();
    }
  }

  btnSubmit_onClick() {
    this.isSubmitClicked = true;
    if (this.bookForm.valid) {
      this.bookId ? this.updateBook(): this.addBook();
    }
  }

  async getBook() {
    // console.log(this.bookId);
    try {
      this.book = await this.http.get<Book>(this.baseUrl + `book/get/${this.bookId}`).toPromise();
    } catch (error) {
      console.log({error})
    }
  }

  async patchBookForm() {
    console.log(this.book);
    this.bookForm.patchValue(this.book);
  }

  addBook() {
    this.http.post(this.baseUrl + 'book/add', this.bookForm.value).subscribe(result => {
      console.log('add', {result});
      if (result) {
        this.router.navigate(['../books']);
     } },
      error => console.error(error))
  }

  updateBook() {
    this.http.put(this.baseUrl + `book/update/${this.bookId}`, this.bookForm.value).subscribe(result => {
      console.log('update', {result});
      if (result) {
        this.router.navigate(['../books']);
     } },
      error => console.error(error))
  }
}
