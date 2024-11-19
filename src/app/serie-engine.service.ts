import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Serie } from './serie.model';
import { Consolidado } from './consolidado';


@Injectable({
  providedIn: 'root'
})
export class SerieEngineService {
   
  authAPIKey = import.meta.env.NG_APP_PUBLIC_API_KEY;
  constructor(private http: HttpClient) { }

  
  findSeries(value:string, ano:number, pageNUmber:number): Observable<any>{
    /*let params = new HttpParams();

    if (status) {
        params = params.set('status', status);
    }

    if (ano) {
        params = params.set('ano', ano.toString());
    }*/
    
    return this.http.get<any>(`/buscarSeries?status=${value}&ano=${ano}&pageNo=${pageNUmber}&pageSize=10`);
    
  }

  //buscarSerie?nome=casa
  findSerie(nome:string): Observable<any>{
    
    return this.http.get<any>(`/buscarSerie?nome=${nome}`);
  }

  
  createSerie(serie: Serie): Observable<Serie> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(`/insertSerie?key=${this.authAPIKey}`, serie, { headers });
  }

  updateSerie(serieId: string,serie: Serie): Observable<Serie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`/updateSerie?key=${this.authAPIKey}&id=${serieId}`, serie, { headers });
}

  deleteSerie(serieId: number): Observable<Serie> {
      return this.http.delete<any>(`deleteSerie?key=key=${this.authAPIKey}&id=${serieId}`);
  }

  consolidadoQtdAno():Observable<Consolidado[]>{ 
    
    return this.http.get<Consolidado[]>(`/consolidadoQtdAno`);
  }
   
  consolidadoQtdProviderAno(provider:string):Observable<Consolidado[]>{ 
    
    return this.http.get<Consolidado[]>(`/consolidadoQtdProviderAno?provider=${provider}`);
  }

}
