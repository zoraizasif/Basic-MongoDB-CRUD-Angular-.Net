import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookUpsertComponent } from './book-upsert/book-upsert.component';

const routes: Routes = [
    {path: '' , component: BookListComponent},
    {path: 'add' , component: BookUpsertComponent},
    {path: 'update/:id' , component: BookUpsertComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
