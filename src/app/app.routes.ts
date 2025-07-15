import { Routes } from '@angular/router';
import { VehicleDetailComponent } from './components/vehicles/vehicle-detail/vehicle-detail.component';
import { VehicleListComponent } from './components/vehicles/vehicle-list/vehicle-list.component';

export const routes: Routes = [
  {
    path: '',
    component: VehicleListComponent,
  },
  {
    path: 'vehicles/:id',
    component: VehicleDetailComponent,
  },
];
