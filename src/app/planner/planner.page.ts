import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-planner',
  templateUrl: 'planner.page.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class PlannerPage {

  constructor() {}

}
