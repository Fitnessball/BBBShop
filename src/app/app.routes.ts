import {RouterModule,Routes} from '@angular/router';
import { BbbshoplisteComponent } from './bbbshopliste/bbbshopliste.component';
import { AdminbbbshoplisteComponent } from './adminbbbshopliste/adminbbbshopliste.component';


export const routes: Routes = [
    { path: '', component:  BbbshoplisteComponent},
    { path: 'bbbshop', component: BbbshoplisteComponent },
    { path: 'admin', component: AdminbbbshoplisteComponent}
];