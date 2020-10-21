import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService as Auth } from "../app/services/auth.service";
const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [Auth ]
  },
  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'indicaciones', loadChildren: './indicaciones/indicaciones.module#IndicacionesPageModule',canActivate: [Auth ] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
