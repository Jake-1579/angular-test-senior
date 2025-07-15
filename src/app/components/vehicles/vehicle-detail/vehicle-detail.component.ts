import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '@services/vehicle.service';
import { Vehicle } from '@interfaces/vehicles';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class VehicleDetailComponent {
  private route = inject(ActivatedRoute);
  private vehicleService: VehicleService = inject(VehicleService);

  vehicle$: Observable<Vehicle | null>;

  constructor() {
    this.vehicle$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) return this.vehicleService.getVehicleById(id);

        return of(null);
      })
    );
  }
}
