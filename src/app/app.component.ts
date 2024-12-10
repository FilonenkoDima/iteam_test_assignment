import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OutputDataComponent } from './data/output-data/output-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, OutputDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
