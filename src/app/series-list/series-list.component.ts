import { Component, OnInit, Input } from '@angular/core';
import { Serie } from '../serie.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SerieEngineService } from '../serie-engine.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,SpinnerComponent],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent implements OnInit{
    
  series: Serie[]=[];
  currentSerie: Serie = {};
  currentIndex = -1;
  message='';
  ano=2024
  status='Watching';
  page=0;
  // options array
  options: string[] = ['Watching', 'Watched', 'Waiting', 'Abandoned'];
  anos: number[] = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]
  isLoading=false;

  constructor(private engine:SerieEngineService, private http: HttpClient) {
    
  }

  ngOnInit() {
    this.isLoading=true;
    this.engine.findSeries(this.status,this.ano,this.page).subscribe({
      next: (data) => {
        this.series = data.content;
        this.isLoading = false;
      },
      error: (e) => console.error(e)
    });
  }

  
  onChange(e:any){
    this.series = [];
    this.isLoading=true;
    this.currentSerie = {};
    this.message = '';
    this.status = e.target.value;
    this.page=0;
    this.engine.findSeries(this.status,this.ano,this.page).subscribe({
      next: (data) => {
        this.series = data.content;
        this.isLoading=false;
      },
      error: (e) => console.error(e)
    });
    
  }

  nextPage(): void{
    this.series = [];
    this.isLoading=true;
    this.currentSerie = {};
    this.message = '';
    this.page=this.page+1;
    this.engine.findSeries(this.status,this.ano,this.page).subscribe({
      next: (data) => {
        this.series = data.content;
        this.isLoading=false;
      },
      error: (e) => console.error(e)
    });
    
  }

  prevPage(): void{
    this.series = [];
    this.isLoading=true;
    this.currentSerie = {};
    this.message = '';
    this.page=this.page-1;
    if(this.page < 0){
      this.page = 0;
    }
    this.engine.findSeries(this.status,this.ano,this.page).subscribe({
      next: (data) => {
        this.series = data.content;
        this.isLoading=false;
      },
      error: (e) => console.error(e)
    });
    
  }

  searchSerie(e:any){    
    this.series = [];
    this.isLoading=true;
    this.currentSerie = {};
    this.message = '';
    if(e.target.value != '')
    {
      this.engine.findSerie(e.target.value).subscribe({
        next: (data) => {
          this.series = data;
          this.isLoading=false;
        },
        error: (e) => console.error(e)
      });
    }
  }

  setActiveSerie(serie: Serie, index: number): void {
    this.message = '';
    this.currentSerie = serie;
    this.currentIndex = index;
  }
 
  updateSerie(): void {
    this.message = '';
    console.log(this.currentSerie);
    if( this.currentSerie.id){
      this.engine.updateSerie(this.currentSerie.id, this.currentSerie)
        .subscribe({
          next: (res) => {
            this.message = 'Série Atualizada!';
          },
          error: (e) => console.error(e)
        });
        this.currentSerie = {};
    }
  }
  
}
