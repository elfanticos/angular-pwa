import { Injectable } from "@angular/core";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { HelperService } from 'src/helpers/helper.service';

@Injectable()
export class AuthService {
    constructor(
        public afDB:AngularFireDatabase,
        public afAuth:AngularFireAuth,
        private helper:HelperService
    ) {

    }

    public async loginWithFacebook() {
        try {
            let rpta = await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
            console.log(rpta);  
        } catch (err) {
            this.helper._messageSnack('Hubo un error');
        }
        
    }

    public async logout() {
        try {
            let rpta = await this.afAuth.auth.signOut();
            console.log(rpta);
        } catch (err) {
            this.helper._messageSnack('Hubo un error');
        }
    }
} 