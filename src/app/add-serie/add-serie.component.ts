import { Component } from '@angular/core';
import { SerieEngineService } from '../serie-engine.service';
import { Serie } from '../serie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-serie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-serie.component.html',
  styleUrl: './add-serie.component.css'
})
export class AddSerieComponent {
   
  serie: Serie = {
    year: 0,
    seriesName: '',
    season: '',
    provider: '',
    app: '',
    status: '',
    imdbId:''
  };
  submitted = false;

  constructor(private serieEngineService: SerieEngineService) { }

  saveSerie(): void {
    const data = {
      year: this.serie.year,
		  seriesName: this.serie.seriesName,
		  season: this.serie.season,
		  provider: this.serie.provider,
		  app: this.serie.app,
		  status: this.serie.status,
      imdbId: this.serie.imdbId
    };

    this.serieEngineService.createSerie(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newSerie(): void {
    this.serie = {
      year: 0,
    seriesName: '',
    season: '',
    provider: '',
    app: '',
    status: '',
    imdbId:''
    };
  }

}
