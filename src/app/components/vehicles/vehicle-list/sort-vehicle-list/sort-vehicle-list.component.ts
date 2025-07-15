import { Component, Output, EventEmitter } from '@angular/core';

export type SortableFields = 'price' | 'year' | 'mileage';

@Component({
  selector: 'app-sort-vehicle-list',
  templateUrl: './sort-vehicle-list.component.html',
  styleUrls: ['./sort-vehicle-list.component.scss'],
  standalone: true,
})
export class SortVehicleListComponent {
  @Output() sortChange = new EventEmitter<{
    field: string;
    direction: 'asc' | 'desc';
  }>();
  sortOptions = [
    { key: 'priceAsc', label: 'Price Asc', field: 'price', direction: 'asc' },
    {
      key: 'priceDesc',
      label: 'Price Desc',
      field: 'price',
      direction: 'desc',
    },
    { key: 'yearAsc', label: 'Year Asc', field: 'year', direction: 'asc' },
    { key: 'yearDesc', label: 'Year Desc', field: 'year', direction: 'desc' },
    {
      key: 'mileageAsc',
      label: 'Mileage Asc',
      field: 'mileage',
      direction: 'asc',
    },
    {
      key: 'mileageDesc',
      label: 'Mileage Desc',
      field: 'mileage',
      direction: 'desc',
    },
  ];

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement)?.value;
    const selected = this.sortOptions.find((option) => option.key === value);
    if (selected) {
      this.sortChange.emit({
        field: selected.field,
        direction: selected.direction as 'asc' | 'desc',
      });
    }
  }
}
