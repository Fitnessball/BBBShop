import {RouterModule,Routes} from '@angular/router';
import { BbbshoplisteComponent } from './bbbshopliste/bbbshopliste.component';


export const routes: Routes = [
    { path: '', component: BbbshoplisteComponent },
    { path: 'bbbshop', component: BbbshoplisteComponent }
];
