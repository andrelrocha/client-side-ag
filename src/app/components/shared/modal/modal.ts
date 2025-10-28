import { Component, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface ModalData {
  title?: string;
  body?: TemplateRef<any>;
  actions?: TemplateRef<any>;
}

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  close() {
    this.dialogRef.close();
  }
}
