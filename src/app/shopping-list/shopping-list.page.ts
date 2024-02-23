import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class ShoppingListPage {
  constructor() {}
}
