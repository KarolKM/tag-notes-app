import { Component } from '@angular/core';
import { NoteFormComponent } from './components/note-form/note-form';
import { NoteListComponent } from './components/note-list/note-list';
import { TagFilterComponent } from './components/tag-filter/tag-filter';
import { Note } from './models/note.model';
import { NoteService } from './services/note';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoteFormComponent,
    NoteListComponent,
    TagFilterComponent
  ],
  templateUrl: './app.html',
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
  handleEdit(note: Note) {
    this.noteBeingEdited = note;
  }

  handleDelete(id: string) {
    this.noteService.removeNote(id);
  }

}