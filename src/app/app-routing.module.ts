import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-components/user-profile/user-profile.component';
import { EditUserComponent } from './user-components/edit-user/edit-user.component';
import { UserBonsaiListComponent } from './plant-components/user-bonsai-list/user-bonsai-list.component';
import { BonsaiDetailComponent } from './plant-components/user-bonsai-list/bonsai-detail/bonsai-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditUserComponent
  },

  {
    path: 'my-bonsais',
    component: UserBonsaiListComponent,
    children: [
      {
        path: 'bonsai-detail',
        component: BonsaiDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
