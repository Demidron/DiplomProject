import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'AutocompleteComponent',
  template: `
    <input type="text" class="{{styles}}"
    disabled="{{isDisabled}}"
      placeholder="{{placeholder}}"
      value="{{innerValue}}"
      [(ngModel)]="autocompleteInput"
      #addresstext 
    >
  `,
  styles: []
})
export class GooglePlaceAutocompleteComponent implements OnInit, AfterViewInit {

  @Input() addressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();

  @ViewChild('addresstext', {static: false}) addresstext: any;
  @Input() innerValue: string;
  @Input() placeholder: string;
  // @Input() inputId: string;
  @Input() styles: string;

  autocompleteInput: string;
  queryWait: boolean;
  isDisabled:boolean=false;
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.getPlaceAutocomplete();}, 1000);
  }

  private getPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
          {
              // componentRestrictions: { country: 'US' },
              types: [this.addressType]  // 'establishment' / 'address' / 'geocode'
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          this.invokeEvent(place);
      });
  }

  invokeEvent(place: google.maps.places.PlaceResult) {
      this.setAddress.emit(place.geometry.location);
  }

}
