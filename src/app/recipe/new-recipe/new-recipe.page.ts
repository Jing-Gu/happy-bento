import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
// import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,IonButton,
//   IonFab, IonFabButton, IonIcon, IonButtons, IonItem, IonText } from '@ionic/angular/standalone'
import { IonicModule } from '@ionic/angular' // seems need ionicModule for the form to work
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons'
import { trash, checkmarkCircleOutline, cloudUploadOutline } from 'ionicons/icons'
import { UntypedFormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms'
import { StorageService } from 'src/app/services/storage.service'
import { Router } from '@angular/router'

import { v4 as uuidv4 } from 'uuid'

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, IonicStorageModule],
})
export class NewRecipePage  {

  constructor() {
    addIcons({trash, checkmarkCircleOutline, cloudUploadOutline})
    this.ingredientsArray = this.newRecipeForm.get('ingredients') as FormArray
   }

  ingredientsArray!: FormArray<any>

  private fb = inject(UntypedFormBuilder)
  private router = inject(Router)
  private storageService = inject(StorageService)

  validExt = ['image/jpg', 'image/jpeg', 'image/png']
  maxSize: number = 5000000
  errors: Array<string> = []
  preview: string | undefined = ''

  onFileSelected(event: any) {
   this.errors = []
    let reader = new FileReader()
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0]
      if (file.size > this.maxSize) {
        this.errors = [...this.errors,`Please select a photo with the size less than ${(this.maxSize / 1000)}MO`]
        }
      if (!this.errors?.length) {
        reader.readAsDataURL(file)
        reader.onload = () => {
        this.newRecipeForm.patchValue({
          img: reader.result?.toString()
        })
        this.preview = reader.result?.toString()
      }
    }
    }
  }



  newRecipeForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    ingredients: this.fb.array([this.createIngredientsFG()]),
    memo: [''],
    img: ['']
  })

  createIngredientsFG(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
    })
  }

   addIngredient() {
    this.ingredientsArray.push(this.createIngredientsFG())
  }

  removeIngredient(index: number) {
     this.ingredientsArray.removeAt(index)
  }

  saveRecipe() {
    const recipeId = uuidv4()
    this.newRecipeForm.patchValue({
      id: recipeId
    })
    const val = this.newRecipeForm.value
    console.log(val)
    this.storageService.addRecipe(val).then(_ => this.storageService.getRecipes())
    this.router.navigate(['../'])
  }

}
