import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'AddRouteWaypoint',
  templateUrl: './add-route-waypoint.component.html',
  styleUrls: ['./add-route-waypoint.component.css']
})
export class AddRouteWaypointComponent implements OnInit {
  faSearch=faSearch;
  constructor() { }
  @ViewChild('waypintAddress', {static: false}) waypintAddress: any;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Input() addressType: string;
  placeLocation:google.maps.LatLng;
  @Input() placeholder: string;
  autocompleteInput: string;
  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(()=> {
      this.getPlaceAutocomplete();}, 1000);
  }

  private getPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.waypintAddress.nativeElement,
          {
              // componentRestrictions: { country: 'US' },
              types: [this.addressType]  // 'establishment' / 'address' / 'geocode'
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          this.placeLocation = autocomplete.getPlace().geometry.location;
         
      });
  }

  invokeEvent() {
    // console.log(this.test);
    if(this.placeLocation){
      this.setAddress.emit(this.placeLocation);
    }
      
  }
}
