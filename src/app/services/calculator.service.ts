import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GuardService } from './guard.service';

@Injectable()
export class CalculatorService {
    private _rawExpression: Array<any> = [];
    private _stringExpression: string;
    private _expression: Array<any> = [];
    private _solution: number;
    private _display: string = '';
    private _justSolved: boolean = false;
    private _solutionSubject: Subject<any> = new Subject();
    private _displaySubject: Subject<any> = new Subject();
    private _justSolvedSubject: Subject<any> = new Subject();

    constructor(private guard: GuardService) {}

    get solution() {
        return this._solutionSubject;
    }

    get display() {
        return this._displaySubject;
    }

    get justSolved() {
        return this._justSolvedSubject;
    }

    addInput(value) {
        const length = this._rawExpression.length;
        const previousValue = this._rawExpression[length - 1]

        /* Expression can only start with a decimal, digit, or minus */
        if ( length === 0 && this.guard.assert(value).isnt(['divide', 'plus', 'times']) ) {
            return false;
        }

        /* Clear out the expression if we try to append a digit after an expression was solved */
        if ( this._justSolved && this.guard.assert(value).is(['digit']) ) {
            this.clear()
        }

        /* Rules applied here - see cantfollow method */
        if ( this.guard.assert(value).cantFollow(previousValue) ) {
            this.deleteLast();
        }

        this._justSolved = false;
        this.justSolved.next(this._justSolved);
        this._rawExpression.push(value);
        this.setDisplay();
        this.setStringExpression();
        this.prepareExpression();
    }

    calculate(math: Array<any>) {
        const cloned = math.slice();

        if ( this._expression.length === 2 ) {
            this._solution = null;
            this.solution.next(this._solution)
        }

        if ( cloned.length < 3 ) return false;

        const first = cloned.shift();
        const second = cloned.shift();
        const third = cloned.shift();

        if ( second === '*' ) {
            this._solution = first * third;
            this.solution.next(this._solution);
        }

        if ( second === '/' ) {
            this._solution = first / third;
            this.solution.next(this._solution);
        }

        if ( second === '+' ) {
            this._solution = first + third;
            this.solution.next(this._solution);
        }

        if ( second === '-' ) {
            this._solution = first - third;
            this.solution.next(this._solution);
        }

        cloned.unshift(this._solution);
        this.calculate(cloned);
    }

    equals() {
        if ( this._expression.length < 3 ) return false;

        this._display = this._solution.toString();
        this._rawExpression = [];
        this._expression = [];
        this._rawExpression.push(this._solution);
        this._expression.push(this._solution);
        this._stringExpression = this._solution.toString();

        this.solution.next(null);
        this.display.next(this._solution.toString());

        this._solution = null;
        this._justSolved = true;
        this.justSolved.next(this._justSolved);
    }

    delete() {
        if ( this._expression.length === 0 ) return false;
        if ( this._justSolved ) return this.clear();
        if ( this._expression.length !== 0 ) return this.deleteLast()
    }

    private deleteLast() {
        this._rawExpression.pop();
        this.setDisplay();
        this.setStringExpression();
        this.prepareExpression();
    }

    private clear() {
        this.clearDisplay();
        this._rawExpression = [];
        this._expression = [];
        this._stringExpression = '';
        this._justSolved = false;
        this.justSolved.next(this._justSolved);
    }

    private clearDisplay() {
        this._display = '';
        this.display.next('');
    }

    private setDisplay() {
        this._display = this._rawExpression.map(i => {
            if ( i === 'divide' ) return '÷';
            if ( i === 'times' ) return '×';
            if ( i === 'minus' ) return '−';
            if ( i === 'plus' ) return '+';
            if ( i === 'decimal' ) return '.';

            return i;
        }).join('')
        this.display.next(this._display);
    }

    private setStringExpression() {
        this._stringExpression = '';

        this._stringExpression = this._rawExpression.map(i => {
            if ( i === 'divide' ) return ' / ';
            if ( i === 'times' ) return ' * ';
            if ( i === 'minus' ) return ' - ';
            if ( i === 'plus' ) return ' + ';
            if ( i === 'decimal' ) return '.';

            return i;
        }).join('')
    }

    private prepareExpression()  {
        let array = this._stringExpression.split(' ').filter(i => i !== '');
        let cloned = array.slice();
        let minuses = [];

        cloned.forEach((elem, index) => {
            if ( elem === '-' ) minuses.push(index);
        });

        if ( minuses.length !== 0 ) {
            minuses.forEach((minusIndex, i) => {
                if ( minusIndex === 0 && cloned[minusIndex + 1] ) {
                    array[minusIndex] = cloned[minusIndex] + cloned[minusIndex + 1];
                    array[minusIndex + 1] = null;
                }

                if (
                    ( cloned[minusIndex - 1] === '*' || cloned[minusIndex - 1] === '/' ) &&
                    ( cloned[minusIndex + 1] )
                ) {
                    array[minusIndex] = cloned[minusIndex] + cloned[minusIndex + 1];
                    array[minusIndex + 1] = null;
                }
            })
        }

        this._expression = array
            .filter(i => i !== null)
            .map(s => {
                if ( this.guard.type.isDigit(s) ) return parseFloat(s);

                return s;
            })

        this.calculate(this._expression);
    }

}
