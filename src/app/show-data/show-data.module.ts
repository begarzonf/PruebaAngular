import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from './show-data.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShowProductModule } from '../show-product/show-product.module';

const routes: Routes = [
  {
    path: '', component: ShowDataComponent,
  },
];

@NgModule({
  declarations: [ShowDataComponent],
  imports: [ 
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ShowProductModule
  ]
})
export class ShowDataModule { }
