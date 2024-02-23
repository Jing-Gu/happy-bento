import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'recipes',
        loadChildren: () => import('../recipe/recipe.routes').then(r => r.routes)
      },
      {
        path: 'planner',
        loadComponent: () =>
          import('../planner/planner.page').then((m) => m.PlannerPage),
      },
      {
        path: 'shopping-list',
        loadComponent: () =>
          import('../shopping-list/shopping-list.page').then((m) => m.ShoppingListPage),
      },
      {
        path: '',
        redirectTo: '/tabs/recipes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/recipes',
    pathMatch: 'full',
  },
];
