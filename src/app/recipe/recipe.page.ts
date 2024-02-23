import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCard, IonCardTitle, IonCardContent, IonCardHeader } from '@ionic/angular/standalone'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'
import { add } from 'ionicons/icons'

import { StorageService } from '../services/storage.service'


@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  standalone: true,
  imports: [CommonModule, IonCardHeader, RouterLink, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonCard, IonCardTitle, IonCardContent],
})
export class RecipePage {

  private storageService = inject(StorageService)

  constructor() {
    addIcons({add})
  }



  recipes$ = this.storageService.getRecipesAsObs()

}
