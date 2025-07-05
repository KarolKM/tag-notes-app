import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.html',
  styleUrls: ['./note-item.scss'],
  standalone: true,
  imports: [],
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