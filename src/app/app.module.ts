import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatToolbarModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NotesService } from 'src/services/notes.service';
import { AuthService } from 'src/services/auth.service';
import { HelperService } from 'src/helpers/helper.service';
import { MessagingService } from 'src/services/messaging.service';

const firebaseConfig:any =  {
  production: false,
  firebase: {
    apiKey: "AIzaSyDPwEFFvFiFTyRLNYZN_pZ-DOJJty_UlwM",
    authDomain: "platzynotas.firebaseapp.com",
    databaseURL: "https://platzynotas.firebaseio.com",
    projectId: "platzynotas",
    storageBucket: "platzynotas.appspot.com",
    messagingSenderId: "881453700326"
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [NotesService,AuthService,HelperService,MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
