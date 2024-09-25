import {RouterModule,Routes} from '@angular/router';
import { BbbshoplisteComponent } from './bbbshopliste/bbbshopliste.component';
import { AdminbbbshoplisteComponent } from './adminbbbshopliste/adminbbbshopliste.component';


export const routes: Routes = [
    { path: '', component: AdminbbbshoplisteComponent },
    { path: 'bbbshop', component: BbbshoplisteComponent },
    { path: 'adminbbbshop', component: AdminbbbshoplisteComponent }
];
