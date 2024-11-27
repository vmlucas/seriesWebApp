import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Consolidado } from '../consolidado';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SerieEngineService } from '../serie-engine.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-consolidado-ano',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,NgChartsModule],
  templateUrl: './consolidado-ano.component.html',
  styleUrl: './consolidado-ano.component.css'
})
export class ConsolidadoAnoComponent implements OnInit{

  consolidados: Consolidado[]=[];
  // options array
  currentIndex = -1;
  

  //chart
  dChartLabels: any;            
  dChartType: ChartType = 'line';
  dChartData:any;

  constructor(private engine:SerieEngineService, private http: HttpClient) {
    
  }

  ngOnInit() {
    this.engine.consolidadoQtdAno().subscribe({
      next: (data) => {
        this.consolidados = data;
        this.dChartLabels = this.consolidados.map(function(item) {
          return item['ano'];
        });
        this.dChartData = {
          labels: this.dChartLabels,
          datasets: [{
            label: 'Séries por ano',
            data: this.consolidados.map(function(item) {
              return item['totalSeries'];
          }),
            borderWidth: 1
          }]
        };
      },
      error: (e) => console.error(e)
    });
  }

  chartClicked(event:any){
       console.log("Chart event");
  }
}

