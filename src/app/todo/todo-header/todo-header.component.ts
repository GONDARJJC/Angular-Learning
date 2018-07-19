import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue = '';
  @Input() placeholder = 'What needs to be done?';
  @Input() delay = 100;

  @Output() TextChanges = new EventEmitter<string>();
  @Output() EnterUp = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    fromEvent(this.elementRef.nativeElement, 'keyup')
    .pipe(
      tap(d => console.log(d)),
      map(() => this.inputValue),
      debounceTime(this.delay),
      distinctUntilChanged()
    )
    .subscribe(input => {
      this.TextChanges.emit(input);
    });
   }

  ngOnInit() {
  }
 
  enterUp() {
    this.EnterUp.emit(true);
    this.inputValue = '';
  }
}
