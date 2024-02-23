import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./recipe.page').then(c => c.RecipePage)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./new-recipe/new-recipe.page').then(c => c.NewRecipePage)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./recipe-details/recipe-details.component').then(c => c.RecipeDetailsComponent),
      },
      // {
      //   path: '',
      //   redirectTo: 'all',
      //   pathMatch: 'full',
      // },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: 'all',
  //   pathMatch: 'full',
  // },
];
