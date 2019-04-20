
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from 'src/helpers/helper.service';

@Injectable()
export class NotesService {
    notas:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    constructor(
        public afDB:AngularFireDatabase,
        private helper:HelperService
    ) {
    }

    get getNotas():any[] {
        return this.notas.value;
    }
    public getNotes() {
        return this.afDB.list('/notes/');
    }

    public getNote(id:string) {
        return this.afDB.object(`/notes/${id}`);
    }

    public async createNote(nota:any) {
        try {
            nota.id   = Date.now();
            let rpta  = await this.afDB.database.ref(`/notes/${nota.id}`).set(nota);
            this.notas.next([...this.getNotas, nota]);
            this.helper._messageSnack('Se registró');
        } catch (err) {
            this.helper._messageSnack('Hubo un error');
        }
        
        
    }

    public editNote(note:any) {
        this.afDB.database.ref(`/notes/${note.id}`).set(note);
    }
    public deleteNote(id) {
        this.afDB.database.ref(`/notes/${id}`).remove();
    }

     
}