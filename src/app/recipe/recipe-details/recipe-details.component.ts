import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,IonButton,
  IonFab, IonFabButton, IonIcon, IonButtons } from '@ionic/angular/standalone'
import { StorageService } from 'src/app/services/storage.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,IonButton,
  IonFab, IonFabButton, IonIcon, IonButtons],
})
export class RecipeDetailsComponent implements OnInit {

  constructor() { }

  private route = inject(ActivatedRoute)
  private storageService = inject(StorageService)

  id = this.route.snapshot.paramMap.get('id')

  recipe$ = this.storageService.getChosenRecipeAsObs()

  ngOnInit() {
    if (this.id) {
      this.storageService.getRecipeById(+this.id)
    }
  }

}
