// src/app/pages/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { LocationModel } from './../../core/models/location.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Locations...';
  locationListSub: Subscription;
  locationList: LocationModel[];
  filteredLocations: LocationModel[];
  loading: boolean;
  error: boolean;
  query: '';

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getLocationList();
  }

  private _getLocationList() {
    this.loading = true;
    // Get future, public events
    this.locationListSub = this.api
      .getLocations$()
      .subscribe(
        res => {
          this.locationList = res;
          this.filteredLocations = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchLocations() {
    this.filteredLocations = this.fs.search(this.locationList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredLocations = this.locationList;
  }

  ngOnDestroy() {
    this.locationListSub.unsubscribe();
  }

}
