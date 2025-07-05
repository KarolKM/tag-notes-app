import { Component } from '@angular/core';
import { Note } from './models/note.model';
import { NoteService } from './services/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [
    // dodaj NoteFormComponent, NoteListComponent, TagFilterComponent
  ],
})
export class AppComponent {
  selectedTag: string | null = null;
  noteBeingEdited: Note | null = null;

  constructor(private noteService: NoteService) {}

  handleNewNote(note: Note): void {
    this.noteService.addNote(note);
  }

  handleTagSelection(tag: string): void {
    this.selectedTag = tag;
  }
  handleEditRequest(note: Note): void {
    this.noteBeingEdited = note;
  }

  handleNoteUpdated(note: Note): void {
    this.noteService.updateNote(note);
    this.noteBeingEdited = null;
  }
  handleNoteDelete(id: string): void {
    this.noteService.removeNote(id);
  }

}