import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-output-data',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './output-data.component.html',
  styleUrl: './output-data.component.css',
})
export class OutputDataComponent {
  private dataService = inject(DataService);
  results: {
    index: number;
    value: number;
    bfs: number;
    bfsTime: number;
    lagrange: number;
    lagrangeTime: number;
  }[] = [];

  setData_10() {
    this.loadResults(this.dataService.getDummyData_10());
  }

  setData_100() {
    this.loadResults(this.dataService.getDummyData_100());
  }

  setData_1000() {
    this.loadResults(this.dataService.getDummyData_1000());
  }

  private loadResults(data: number[]) {
    this.results = data.map((value, index) => {
      const startBfs = performance.now();
      const bfsResult = this.dataService.sumOfSquares_BFS(value);
      const endBfs = performance.now();

      const startLagrange = performance.now();
      const lagrangeResult = this.dataService.sumOfSquares(value);
      const endLagrange = performance.now();

      return {
        index,
        value,
        bfs: bfsResult,
        bfsTime: endBfs - startBfs,
        lagrange: lagrangeResult,
        lagrangeTime: endLagrange - startLagrange,
      };
    });
  }

  get bfsTotalTime(): number {
    return this.results.reduce((acc, curVal) => acc + curVal.bfsTime, 0);
  }

  get lagrangeTotalTime(): number {
    return this.results.reduce((acc, curVal) => acc + curVal.lagrangeTime, 0);
  }
}
