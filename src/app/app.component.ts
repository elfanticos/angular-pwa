import { Component, OnInit, OnDestroy } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { NotesService } from 'src/services/notes.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { MessagingService } from 'src/services/messaging.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'pwa';
  panelOpenState = false;
  categorias:any[] = [
    'trabajo',
    'persona'
  ];
  nota:any = {};
  notas:any[] = [];
  sub_notas:Subscription = new Subscription();
  flg_edit:boolean = false;
  expand:boolean = false;
  message: any = null;
  sub_message:Subscription = new Subscription();
  constructor(
    private swUpdate:SwUpdate,
    private notesService:NotesService,
    private autService:AuthService,
    private messagingService:MessagingService
    ) {
      // this.notesService.notas.next();
      
  }

  ngOnInit(): void {
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
    this.sub_notas = this.notesService.getNotes().valueChanges().subscribe(fbNotas =>{
      this.notas    = fbNotas;
      this.flg_edit = false;
      this.expand   = false;
      this.nota     = {};
    });
    // this.sub_notas = this.notesService.notas.subscribe(notas => {
    //   this.notas = notas;
    // });
    this.messagingService.getPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    // this.sub_message = this.messagingService.currentMessage.subscribe(data => {
    //   this.message = data;
    // });
  }

  ngOnDestroy():void {
    this.sub_notas.unsubscribe();
    this.sub_message.unsubscribe();
  }

  guardarNota():void { 
    this.expand = true;
    if (this.flg_edit) {
      this.notesService.editNote(this.nota);
    } else {
      this.notesService.createNote(this.nota);
    }
  }

  seleccionarNota(nota):void {
    this.nota = {...nota};
    this.flg_edit = true;
  }

  login():void {
    this.autService.loginWithFacebook();
  }

  logout():void {
    this.autService.logout();
  }
}

/*
curl https://fcm.googleapis.com/fcm/send \
-H"Content-Type: application/json" \
	-H"Authorization: key=AAAAzTq8FOY:APA91bGx3mC-GWaQEAD6GOOln0VlEEgadgOH21CprzkKLrZPX2O0Kx1BVLzzZ4EmKxr8hm2mCwpATM0qobJWzJxWW_RgLX2fiDEIgHXZU1b51xTfhYbU30F7RKr8YunqYBQ0x1iGw0-_" \
-d '{ "notification": { "title": "Nueva Feature!", "body": "Hay nuevas features","icon":"https://url-de-tu-icono", "click_action": "http://www.platzi.com"}, "to" : "dZONWLdPwis:APA91bGjmPb3P5DA9qLOW-Dfsb7NPyYIN4gNvM5yRh5WkEI49axtakeDNI9LnfkCbS07KMYfarOM75mmtPWXN9Uv7tTH0HPzvzh4F0TCCZ1Ajv6b4In4-zuXELvWAVUCJhsk8DN6YClZ"
}'
*/