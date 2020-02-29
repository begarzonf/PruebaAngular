import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard"

const routes: Routes = [
{ 
  path: 'login', 
  loadChildren: () => import('./show-login/show-login.module').then(m => m.ShowLoginModule)

},
{ 
  path: 'data', 
  loadChildren: () => import('./show-data/show-data.module').then(m => m.ShowDataModule),
  canActivate: [AuthGuard]
},
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
