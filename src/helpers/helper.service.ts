import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HelperService {
    constructor(
        private _snackBar: MatSnackBar
    ) {}

    _messageSnack(msj:string) {
        this._snackBar.open(msj, 'Cerrar',{
            duration : 3000
          });
    }
}