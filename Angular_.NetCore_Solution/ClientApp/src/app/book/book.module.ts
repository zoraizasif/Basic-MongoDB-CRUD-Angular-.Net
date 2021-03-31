import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookUpsertComponent } from './book-upsert/book-upsert.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BookComponent, BookUpsertComponent, BookListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule
  ]
})
export class BookModule { }
