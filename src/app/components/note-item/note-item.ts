import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.html',
  styleUrls: ['./note-item.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    DatePipe,
  ],
})
export class NoteItemComponent {
  @Input() note!: Note;
  @Output() editRequested = new EventEmitter<Note>();
  @Output() deleteRequested = new EventEmitter<string>();
  
  requestEdit(): void {
    this.editRequested.emit(this.note);
  }

  requestDelete(): void {
    this.deleteRequested.emit(this.note.id);
  }
}