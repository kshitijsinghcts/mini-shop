import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent] // ✅ standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event on query change', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.query = 'Laptop';
    component.onQueryChange();
    tick(300); // simulate debounce delay
    expect(component.search.emit).toHaveBeenCalledWith({ query: 'Laptop', category: 'all' });
  }));

  it('should filter suggestions based on query', () => {
    component.query = 'lap';
    component.onQueryChange();
    expect(component.filteredSuggestions).toContain('Laptop');
    expect(component.filteredSuggestions.length).toBeGreaterThan(0);
  });

  it('should update query and emit search when suggestion is selected', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.query = 'Phone';
    component.onQueryChange(); // simulate filtering
    component.selectSuggestion('Phone');
    tick(300); // simulate debounce
    expect(component.query).toBe('Phone');
    expect(component.filteredSuggestions.length).toBe(0);
    expect(component.search.emit).toHaveBeenCalledWith({ query: 'Phone', category: 'all' });
  }));

  it('should emit search event when category changes', fakeAsync(() => {
    spyOn(component.search, 'emit');
    component.category = 'electronics';
    component.onCategoryChange();
    tick(300); // simulate debounce
    expect(component.search.emit).toHaveBeenCalledWith({ query: '', category: 'electronics' });
  }));

  it('should clear suggestions after selecting one', fakeAsync(() => {
  component.query = 'Lap';
  component.onQueryChange();
  tick(300); // simulate debounce
  component.selectSuggestion('Laptop');
  tick(300); // simulate debounce
  expect(component.filteredSuggestions.length).toBe(0);
}));
});
