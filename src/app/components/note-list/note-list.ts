import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note';
import { NoteItemComponent } from '../note-item/note-item';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteItemComponent],
  templateUrl: './note-list.html',
  styleUrls: ['./note-list.scss'],
})
export class NoteListComponent implements OnInit, OnChanges {
  @Input() selectedTag: string | null = null;
  @Output() editRequested = new EventEmitter<Note>();
  @Output() deleteRequested = new EventEmitter<string>();

  allNotes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.allNotes = notes;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTag']) {
      this.applyFilter();
    }
  }

  private applyFilter(): void {
    if (this.selectedTag) {
      this.filteredNotes = this.allNotes.filter(note =>
        note.tags.includes(this.selectedTag!)
      );
    } else {
      this.filteredNotes = [...this.allNotes];
    }
  }

  onEdit(note: Note): void {
    this.editRequested.emit(note);
  }

  onDelete(id: string): void {
    this.noteService.removeNote(id);
    this.deleteRequested.emit(id);
  }
}