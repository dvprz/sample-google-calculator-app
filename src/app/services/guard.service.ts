import { Injectable } from '@angular/core';
import { TypeCheckerService } from './type-checker.service';

@Injectable()
export class GuardService {
    private _value: string;

    constructor(public type: TypeCheckerService) {}

    assert(value: string) {
        this._value = value;
        return this;
    }

    isnt(blacklist: Array<string>): boolean {
        return this.checks(blacklist);
    }

    is(whitelist: Array<any>): boolean {
        return this.checks(whitelist);
    }

    /*
    decimal can follow anything
    x can only follow a number
    / can only follow a number
    + can only follow a number
    - can follow x and /
    */
    cantFollow(oldValue: string): boolean {
        if ( this.type.isDecimal(oldValue) ) return false;

        if ( this._value === 'minus' &&
            ( this.type.isTimes(oldValue) || this.type.isDivision(oldValue) )
        ) {
            return false;
        }

        if ( this._value === 'minus' && this.type.isPlus(oldValue) ) {
            return true;
        }

        if ( this._value === 'times' && !this.type.isDigit(oldValue) ) {
            return true;
        }

        if ( this._value === 'divide' && !this.type.isDigit(oldValue) ) {
            return true;
        }

        if ( this._value === 'plus' && !this.type.isDigit(oldValue) ) {
            return true;
        }
    }

    private checks(array: Array<any>): boolean {
        if ( !this._value ) throw new Error('Please set value.')

        if ( array.includes('digit') ) {
            return this.type.isDigit(this._value)
        }

        return array.includes(this._value)
    }

}
