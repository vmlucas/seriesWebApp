import { Routes } from '@angular/router';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { ConsolidadoComponent } from './consolidado/consolidado.component';

export const routes: Routes = [
    { path: '', redirectTo: 'series', pathMatch: 'full' },
    { path: 'series', component: SeriesListComponent },
    { path: 'add', component: AddSerieComponent },
    { path: 'consolidado', component: ConsolidadoComponent }
];
