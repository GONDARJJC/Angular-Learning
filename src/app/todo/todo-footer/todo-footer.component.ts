import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  @Input() itemCount: number;
  @Output() Clear = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.Clear.emit(true);
  }
}
