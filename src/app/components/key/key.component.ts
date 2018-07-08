import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent {
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>()

    click() {
        this.clicked.emit()
    }

}
