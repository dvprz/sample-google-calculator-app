# Calculator

Another exercise in recreating an app that already exists. This calculator is based
off Google's android calculator app.

## Demo
Play with the [Demo].

## Development server

Run `ng serve` for a dev server.

## Planning the structure
I broke down how a user interacts with the calculator into inputs and actions; operators are also inputs.

### Inputs
* Digits (0 - 9)
* Decimal (.)
* Operators (/, x, -, +)

### Actions
* Equals (=)
* Delete (DEL/CLR)

### Rules
- Expressions can start with a decimal, digit, or minus
- Decimal can follow anything
- Times (x) can only follow a digit
- Divide (/) can only follow a digit
- Plus (\+) can only follow a digit
- Minus (\-) can follow x, /, decimal, and digits

There are some features missing that are either way beyond my capabilities (not a scientific calculator) or would have been too time consuming like giving the display text input functionalities (ability to move your cursor, highlight, copy and paste, etc). Perhaps in a future version of it.

[Demo]: http://daveperez.io/calculator-app/
[Blog post]: http://daveperez.io/recreating-googles-calculator-app/
