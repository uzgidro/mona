import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard, nonAuthGuard} from "./app-guard.guard";
import {BlankComponent} from "./blank/blank.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [nonAuthGuard]
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then(m => m.MessageModule),
    canActivate: [authGuard]
  },
  {
    path: 'logout',
    component: BlankComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
