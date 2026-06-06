import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  value = 0;
  from = 'cholesterol';
  to = 'mg/dL';
  result = 0;
  units = [
    'Cholesterol mmol/L',
    'Glucose mmol/L',
    'Triglyceride mmol/L',
    'BUA umol/L',
    'BUN mmol/L',
    'Creatinine umol/L'
  ];
  // Factors from the spreadsheet image: multiply mmol/L by factor to get mg/dL
  factors: { [k: string]: number } = {
    'Cholesterol mmol/L': 38.67,
    'Glucose mmol/L': 18.02,
    'Triglyceride mmol/L': 88.57,
    'BUA umol/L': 0.0168,
    'BUN mmol/L': 2.8,
    'Creatinine umol/L': 0.0113,
    'mg/dL': 1,
  };

  convert() {
    const v = Number(this.value) || 0;
    const fFrom = this.factors[this.from] ?? 1;
    const fTo = this.factors[this.to] ?? 1;
    // If converting to mg/dL (the factors table target), multiply by from-factor
    // Otherwise convert by ratio of factors
    if (this.to === 'mg/dL') {
      this.result = v * fFrom;
    } else {
      this.result = v * (fFrom / fTo);
    }
  }

  clear() {
    this.value = 0;
    this.result = 0;
  }

  get display() {
    return Number(this.result).toLocaleString(undefined, { maximumFractionDigits: 6 });
  }
}
