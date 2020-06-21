import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-route-dialog',
  templateUrl: './delete-route-dialog.component.html',
  styles: []
})
export class DeleteRouteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRouteDialogComponent>) { }

  ngOnInit() {
    
  }

}
