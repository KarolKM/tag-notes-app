import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(note: Note): void {
    this.notes.push(note);
    this.updateSubject();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.updateSubject();
    }
  }

  removeNote(id: string): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.updateSubject();
  }

  filterByTag(tag: string): Note[] {
    return this.notes.filter(note => note.tags.includes(tag));
  }

  private updateSubject(): void {
    this.notesSubject.next([...this.notes]);
  }
}