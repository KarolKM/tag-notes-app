import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  templateUrl: './note-item.html',
  styleUrls: ['./note-item.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe
  ],
})
export class NoteItemComponent {
  @Input() note!: Note;
  @Output() editRequested = new EventEmitter<Note>();
  @Output() deleteRequested = new EventEmitter<string>();

  requestEdit() {
    this.editRequested.emit(this.note);
  }

  requestDelete() {
    this.deleteRequested.emit(this.note.id);
  }
}