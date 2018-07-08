import { Component, Input, OnInit, HostListener } from '@angular/core';
import { TypeCheckerService } from '../../services/type-checker.service';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
    display: string = '';
    solution: number;
    justSolved: boolean = false;

    constructor(private calculator: CalculatorService) {}

    @HostListener('document:keyup', ['$event'])
    onKeypress(event: KeyboardEvent) {
        if (
            event.key === '0' || event.key === '1' || event.key === '2' || event.key === '3' ||
            event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' ||
            event.key === '8' || event.key === '9' || event.key === '.'
        ) {
            return this.input(event.key);
        }

        if ( event.key === '/' ) return this.input('divide');
        if ( event.key === '*' ) return this.input('times');
        if ( event.key === '+' ) return this.input('plus');
        if ( event.key === '-' ) return this.input('minus');
        if ( event.key === 'Backspace' ) return this.delete();
        if ( event.key === 'Enter' ) return this.equals();
    }

    ngOnInit() {
        this.calculator.solution.subscribe(solution => {
            if ( Number.isNaN(solution) ) return;
            this.solution = solution
        });
        this.calculator.display.subscribe(display => this.display = display);
        this.calculator.justSolved.subscribe(justSolved => this.justSolved = justSolved);
    }

    input(value) {
        this.calculator.addInput(value)
    }

    equals() {
        this.calculator.equals();
    }

    delete() {
        this.calculator.delete();
    }
}
