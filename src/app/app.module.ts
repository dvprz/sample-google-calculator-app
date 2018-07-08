import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { KeyComponent } from './components/key/key.component';

import { TypeCheckerService } from './services/type-checker.service';
import { CalculatorService } from './services/calculator.service';
import { GuardService } from './services/guard.service';


@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    KeyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      TypeCheckerService,
      CalculatorService,
      GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
