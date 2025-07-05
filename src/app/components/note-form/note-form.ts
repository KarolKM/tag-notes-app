import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/note.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.html',
  styleUrls: ['./note-form.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class NoteFormComponent implements OnChanges {
  @Input() noteToEdit: Note | null = null; // przekazywana notatka do edycji
  @Output() noteCreated = new EventEmitter<Note>();
  @Output() noteUpdated = new EventEmitter<Note>();

  noteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noteToEdit'] && this.noteToEdit) {
      this.noteForm.patchValue({
        title: this.noteToEdit.title,
        content: this.noteToEdit.content,
        tags: this.noteToEdit.tags.join(', '),
      });
    }
  }

  submitForm(): void {
    const formValue = this.noteForm.value;
    const now = new Date();

    if (this.noteToEdit) {
      const updatedNote: Note = {
        ...this.noteToEdit,
        title: formValue.title,
        content: formValue.content,
        tags: formValue.tags.split(',').map((t: string) => t.trim()),
        updatedAt: now,
      };
      this.noteUpdated.emit(updatedNote);
    } else {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: formValue.title,
        content: formValue.content,
        tags: formValue.tags.split(',').map((t: string) => t.trim()),
        createdAt: now,
        updatedAt: now,
      };
      this.noteCreated.emit(newNote);
    }

    this.noteForm.reset();
  }
}