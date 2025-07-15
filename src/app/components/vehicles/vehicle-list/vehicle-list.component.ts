import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleService } from '@services/vehicle.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  SortVehicleListComponent,
  SortableFields,
} from './sort-vehicle-list/sort-vehicle-list.component';
import { Vehicles } from 'src/interfaces/vehicles';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  standalone: true,
  imports: [SortVehicleListComponent, RouterModule],
})
export class VehicleListComponent {
  vehiclesSerivce: VehicleService = inject(VehicleService);
  vehicles$: Observable<Vehicles> = this.vehiclesSerivce.getAllVehicles();

  rawVehicles: Signal<Vehicles> = toSignal(
    this.vehiclesSerivce.getAllVehicles(),
    { initialValue: [] }
  );

  vehicleSearchInput: WritableSignal<string> = signal('');

  sortOption = signal<{ field: string; direction: 'asc' | 'desc' } | null>(
    null
  );

  //rather than signal approach, we could also make a subject and .next() and use combineLatest() with the observable and the subject and map and transform the array
  readonly sortedVehicles = computed(() => {
    const vehicles = this.rawVehicles();
    const option = this.sortOption();

    if (!option) return vehicles;

    return [...(vehicles as Vehicles)].sort((prev, curr) => {
      if (
        prev[option.field as SortableFields] <
        curr[option.field as SortableFields]
      )
        return option.direction === 'asc' ? -1 : 1;
      if (
        prev[option.field as SortableFields] >
        curr[option.field as SortableFields]
      )
        return option.direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  onSortChange(option: { field: string; direction: 'asc' | 'desc' }): void {
    this.sortOption.set(option);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.vehicleSearchInput.set(input.value);
    //I dont know what you are looking for with the input, if its a lookup then we would need to keep reference to that input and filter the array.
    //Searching input we would do router.navigate
  }
}
