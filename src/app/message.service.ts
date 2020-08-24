import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(public snackBar: MatSnackBar) {}

  /**
   * Send messages to inform user about the stae of the app.
   * For example, when the AgentsAPI fails, this uses snackbar
   * to display the custom message.
   */
  openSnackBar(message: string, action: string = 'Dismiss') {
    const snackBarRef = this.snackBar.open(message, action);

    if (action === 'Retry') {
      snackBarRef.onAction().subscribe(() =>  {
        window.location.reload();
      });
    }

    if (action === 'Dismiss') {
      snackBarRef.onAction().subscribe(() =>  {
        snackBarRef.dismiss();
      });
    }
  }
}
