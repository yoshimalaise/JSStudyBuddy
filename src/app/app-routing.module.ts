import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise-view/components/exercise-component/exercise-component.component';
import { PresentComponent } from './presentations/pages/present/present.component';
import { SelectPresentationComponent } from './presentations/pages/select-presentation/select-presentation.component';
import { SelectProblemPage } from './problem-importer/components/select-problem/select-problem.page';
import { OverviewComponent } from './progress/components/overview/overview.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'select-problemset',
    component: SelectProblemPage
  },
  {
    path: 'exercise',
    component: ExerciseComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'select-presentation',
    component: SelectPresentationComponent
  },
  {
    path: 'present',
    component: PresentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
