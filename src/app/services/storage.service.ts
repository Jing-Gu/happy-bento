import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage-angular'
import { BehaviorSubject, Observable } from 'rxjs'
import * as defaultRecipes from '../../assets/default-recipes.json'

export interface Recipe {
  id: number
  title: string
  ingredients: string[]
  memo?: string
  img?: string
}

const ITEMS_KEY = 'recipes'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private recipesSubject = new BehaviorSubject<Recipe[]>([])
  private chosenRecipeSubject = new BehaviorSubject<Recipe | null>(null)

  constructor(private storage: Storage) {
    this.init()
   }

  getRecipesAsObs(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable()
  }

  getChosenRecipeAsObs(): Observable<Recipe | null> {
    return this.chosenRecipeSubject.asObservable()
  }


  async init() {
    await this.storage.create()
    const storedRecipes = await this.storage.get(ITEMS_KEY)
    if (!storedRecipes) {
      await this.storage.set(ITEMS_KEY, defaultRecipes)
    }
    this.getRecipes()
  }


  async addRecipe(item: Recipe) {
    return await this.storage?.get(ITEMS_KEY).then((items) => {
      if(items) {
        items.default.push(item)
        return this.storage?.set(ITEMS_KEY, items)
      } else {
        return this.storage?.set(ITEMS_KEY, [item])
      }
    })
  }

  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.storage?.get(ITEMS_KEY)
    console.log('ser', recipes)
    if (recipes) {
      this.recipesSubject.next(recipes.default)
      return recipes.default
    } else {
      return [] // Handle undefined value
    }
  }


  async getRecipeById(id: number) {
    await this.storage?.get(ITEMS_KEY).then((items) => {
      if(items) {
        const chosen = items.default.find((item: Recipe) => item.id === id)
        this.chosenRecipeSubject.next(chosen)
        return chosen
      } else {
        return []
      }
    })
  }

  deleteRecipe(id: number) {

  }
}
