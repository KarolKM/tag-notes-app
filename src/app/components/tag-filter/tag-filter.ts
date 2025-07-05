import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.html',
  styleUrls: ['./tag-filter.scss'],
  standalone: true,
  imports: [],
})
export class TagFilterComponent {
  @Input() allTags: string[] = [];
  @Output() tagSelected = new EventEmitter<string>();

  selectTag(tag: string): void {
    this.tagSelected.emit(tag);
  }
}