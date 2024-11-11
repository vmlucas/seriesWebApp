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
  selector: 'app-consolidado',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,NgChartsModule],
  templateUrl: './consolidado.component.html',
  styleUrl: './consolidado.component.css'
})
export class ConsolidadoComponent implements OnInit{
 
  consolidados: Consolidado[]=[];
  consolidadosTemp: Consolidado[]=[];
  // options array
  providers:string[] = [];
  provider:string='';
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
        this.consolidadosTemp = data;
        this.providers = this.consolidadosTemp.map(function(item) {
          return item['provider'];
      })
      this.providers = this.providers.filter((value, index, array) => array.indexOf(value) === index);},
      error: (e) => console.error(e)
    });
  }

  onChange(event:any) {
    this.provider = event.target.value;
    this.engine.consolidadoQtdProviderAno(this.provider).subscribe({
      next: (data) => {
        this.consolidados = data;
        this.dChartLabels = this.consolidados.map(function(item) {
          return item['ano'];
        });
        this.dChartData = {
          labels: this.dChartLabels,
          datasets: [{
            label: 'Séries '+this.provider+' por ano',
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

