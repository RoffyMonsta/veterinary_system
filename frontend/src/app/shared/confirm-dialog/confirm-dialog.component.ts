
import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmDialogComponent implements OnInit {

    dialogData: DialogData;
    title:string;
    message:string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
                ) {}

    ngOnInit() {

    }

    onConfirm(): void {
        // Close the dialog, return true
    }

    onDismiss(): void {
        // Close the dialog, return false
        
    }
}