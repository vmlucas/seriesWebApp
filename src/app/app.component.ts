import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Serie } from './serie.model';
import { SerieEngineService } from './serie-engine.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet,RouterLink, RouterLinkActive,
            FormsModule,ReactiveFormsModule,
            HttpClientModule
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'seriesWeb';
  
  constructor(private engine:SerieEngineService, private http: HttpClient, private router: Router) { }

  
  
}
