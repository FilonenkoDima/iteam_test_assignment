import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { DecimalPipe } from '@angular/common';
import { CalculationResult } from '../calculation-result.model';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-output-data',
  standalone: true,
  imports: [DecimalPipe, FormsModule, AboutComponent],
  templateUrl: './output-data.component.html',
  styleUrls: ['./output-data.component.css'],
})
export class OutputDataComponent {
  private dataService = inject(DataService);
  results: CalculationResult[] = [];
  isOpenAbout = signal(false);

  setData_10() {
    this.setData(this.dataService.getDummyData_10());
  }

  setData_100() {
    this.setData(this.dataService.getDummyData_100());
  }

  setData_1000() {
    this.setData(this.dataService.getDummyData_1000());
  }

  private setData(data: number[]) {
    this.results = data.map((value, index) =>
      this.calculateResults(value, index)
    );
  }

  private calculateResults(value: number, index: number): CalculationResult {
    const startBfs = performance.now();
    const bfsResult = this.dataService.sumOfSquares_BFS(value);
    const endBfs = performance.now();

    const startLagrange = performance.now();
    const lagrangeResult = this.dataService.sumOfSquares_Lagrange(value);
    const endLagrange = performance.now();

    return {
      index,
      value,
      bfs: bfsResult,
      bfsTime: endBfs - startBfs,
      lagrange: lagrangeResult,
      lagrangeTime: endLagrange - startLagrange,
    };
  }

  get bfsTotalTime(): number {
    return this.results.reduce((acc, curVal) => acc + curVal.bfsTime, 0);
  }

  get lagrangeTotalTime(): number {
    return this.results.reduce((acc, curVal) => acc + curVal.lagrangeTime, 0);
  }

  onOpenAbout() {
    this.isOpenAbout.set(true);
  }

  onCloseAbout() {
    this.isOpenAbout.set(false);
  }
}
