import { Injectable } from '@angular/core';

@Injectable()
export class TypeCheckerService {

    isDigit(value: string): boolean {
        return /\d+/.test(value);
    }

    isDecimal(operator: string): boolean {
        return operator === '.';
    }

    isTimes(operator: string): boolean {
        return operator === 'times';
    }

    isDivision(operator: string): boolean {
        return operator === 'divide';
    }

    isPlus(operator: string): boolean {
        return operator === 'plus';
    }

    isMinus(operator: string): boolean {
        return operator === 'minus';
    }

    isOperator(operator: string): boolean {
        if (
            this.isTimes(operator) ||
            this.isDivision(operator) ||
            this.isPlus(operator) ||
            this.isMinus(operator)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
