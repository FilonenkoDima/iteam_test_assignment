import { Component, inject } from '@angular/core';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private dataService = inject(DataService);
  DUMMY_DATA = this.dataService.getDummyData_1000();

  constructor() {
    console.log(this.DUMMY_DATA);
  }

  sumOfSquares(n: number) {
    let tmp = n;
    const squareCheck = (i: number) => {
      let s = Math.floor(Math.sqrt(i));
      return s * s === i;
    };
    if (squareCheck(n)) {
      return 1;
    }
    for (let i = 1; i <= Math.floor(Math.sqrt(n)); ++i) {
      if (squareCheck(n - i * i)) {
        return 2;
      }
    }
    while (tmp % 4 === 0) {
      tmp = tmp >> 2;
    }
    if (tmp % 8 === 7) {
      return 4;
    }
    return 3;
  }

  sumOfSquares_BFS(n: number) {
    if (n <= 0) return 0;

    // Precompute perfect squares up to the square root of n
    const squares: number[] = [];
    for (let i = 1; i * i <= n; i++) {
      squares.push(i * i);
    }

    // Helper function to find the minimal count using BFS
    function bfs(target: number) {
      const queue = [target];
      const visited = new Set();
      let depth = 0;

      while (queue.length > 0) {
        const size = queue.length;
        depth++;

        for (let i = 0; i < size; i++) {
          const current: number = queue.shift()!;
          for (const square of squares) {
            const next = current - square;
            if (next === 0) return depth;
            if (next > 0 && !visited.has(next)) {
              visited.add(next);
              queue.push(next);
            }
          }
        }
      }
      console.log(1);
      return depth;
    }

    return bfs(n);
  }
}
