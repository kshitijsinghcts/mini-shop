import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent implements OnInit {
  query: string = '';
  category: string = 'all';
  suggestions: string[] = ['Laptop', 'Phone', 'Headphones', 'Charger', 'Camera', 'Smartwatch', 'Tablet'];
  filteredSuggestions: string[] = [];

  private searchSubject = new Subject<{ query: string; category: string }>();

  @Output() search = new EventEmitter<{ query: string; category: string }>();

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value);
    });
  }

  onQueryChange(): void {
    this.filteredSuggestions = this.suggestions.filter(s =>
      s.toLowerCase().includes(this.query.toLowerCase())
    );
    this.searchSubject.next({ query: this.query, category: this.category });
  }

  onCategoryChange(): void {
    this.searchSubject.next({ query: this.query, category: this.category });
  }
selectSuggestion(s: string): void {
  this.query = s;
  this.filteredSuggestions = [];
  this.searchSubject.next({ query: this.query, category: this.category });
}
}
