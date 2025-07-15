import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '@interfaces/vehicles';
import { Observable, map } from 'rxjs';

//assuming we want it globally provided
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  private readonly vehiclesEndpoint: string = './data/vehicles.json';

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehiclesEndpoint);
  }

  getVehicleById(id: string): Observable<Vehicle | null> {
    return this.http.get<Vehicle[]>(this.vehiclesEndpoint).pipe(
      map(
        //incase cannot find id, make it null but we could fall back to whatever.
        (vehicles: Vehicle[]) =>
          vehicles.find((vehicle) => vehicle?.id === id) ?? null
      )
    );
  }
}
