import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() isChecked = false;
  @Input() todoDesc = '';
  @Output() ToggleTriggered = new EventEmitter<boolean>();
  @Output() RemoveTriggered = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.ToggleTriggered.emit(true);
  }
  remove() {
    this.RemoveTriggered.emit(true);
  }

}
