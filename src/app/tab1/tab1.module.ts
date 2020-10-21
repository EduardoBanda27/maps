import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBYSwbBQGZZLGvYH7MfbR7fXz_f5wAlLOQ'
    }),
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}