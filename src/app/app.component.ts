import { Component, OnInit, OnDestroy } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import { NotesService } from 'src/services/notes.service';
import { Subscription } from 'rxjs';
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
  constructor(
    private swUpdate:SwUpdate,
    private notesService:NotesService
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
  }

  ngOnDestroy():void {
    this.sub_notas.unsubscribe();
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
}
