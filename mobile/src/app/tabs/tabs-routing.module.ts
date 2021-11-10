import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'symptom',
        loadChildren: () => import('../symptom/symptom.module').then(m => m.SymptomModule)
      },
      {
        path: 'animals',
        loadChildren: () => import('../animals/animals.module').then(m => m.AnimalsModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: '',
        redirectTo: '/tabs/symptom',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/tabs/symptom',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
