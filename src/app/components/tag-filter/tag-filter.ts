import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-filter',
  standalone: true,
  templateUrl: './tag-filter.html',
  styleUrls: ['./tag-filter.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatButtonModule
  ],
})

export class TagFilterComponent {
  @Input() allTags: string[] = [];
  @Output() tagSelected = new EventEmitter<string>();

  selectTag(tag: string): void {
    this.tagSelected.emit(tag);
  }
}