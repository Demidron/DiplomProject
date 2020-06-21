import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { GmapService } from 'src/app/shared/gmap.service';
import { CreateRouteModel } from '../../models/create-route-model';
import { IRoute } from '../../interfaces/IRoute';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { MarkerManager } from '../../classes/MarkerManager';

import { IRoutePainter } from '../../interfaces/IRoutePainter';
import { RouteTransit } from '../../classes/transit/RouteTransit';
import { DirectionPlan } from '../../classes/DirectionPlan';
import { Route } from '../../classes/Route';
import { GeoService } from 'src/app/services/GeoService';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatIcon } from '@angular/material';
import { GooglePlaceAutocompleteComponent } from '../google-places-autocomplete/google-places.component';



@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  animations: [
     
      trigger('rotatedState', [
        state('default', style({ transform: 'rotate(0)' })),
        state('rotated', style({ transform: 'rotate(-180deg)' })),
        transition('rotated => default', animate('1500ms ease-out')),
        transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class CreateRouteComponent implements OnInit {
  faChevronRight=faChevronRight;
  faChevronLeft=faChevronLeft;
  public map: google.maps.Map;
  public isNewRoute:boolean=false;
  public isVarRoute:boolean=false;
  private selectedInput:number=0;
  public createRouteModel:CreateRouteModel;
   
  private directionPlan:DirectionPlan;

  // @Input() lastRoute: IRoute;
  @Output() selectedRoute: EventEmitter<any> = new EventEmitter();

  constructor(public gmapService: GmapService,public calendar: NgbCalendar) {
    this.createRouteModel=new CreateRouteModel(this.calendar);
    this.directionPlan=new DirectionPlan(this);
  }
  @ViewChild('travelMode', {static: false}) travelMode: ElementRef;

  
  ngOnInit() {

  }
  @ViewChild('addresstextStart', {static: false}) addresstextStart: any;
  @ViewChild('addresstextEnd', {static: false}) addresstextEnd: any;
  ngAfterViewInit() {
    setTimeout(()=> {
      this.getPlaceAutocomplete();}, 1000);
  }

  private getPlaceAutocomplete() {
      const autocomplete = new google.maps.places.Autocomplete(this.addresstextStart.nativeElement,
          {
              // componentRestrictions: { country: 'US' },
              types: ['geocode']  // 'establishment' / 'address' / 'geocode'
          });
        const autocomplete2 = new google.maps.places.Autocomplete(this.addresstextEnd.nativeElement,
          {
              // componentRestrictions: { country: 'US' },
              types: ['geocode']  // 'establishment' / 'address' / 'geocode'
          });
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          if(place){
            this.directionPlan.setMarkerStart(place.geometry.location);

          }
      });
      google.maps.event.addListener(autocomplete2, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if(place){
          this.directionPlan.setMarkerEnd(place.geometry.location);

        }
    });
  }
  
  createNewRoute(lastRoute: IRoute){
    var self=this;
      this.map.addListener('click', function(event) {
        if(self.selectedInput==0){
          return;
        }
        switch (self.selectedInput) {
          case 1:
            self.directionPlan.setMarkerStart(event.latLng);
            break;
          case 2:
            self.directionPlan.setMarkerEnd(event.latLng);
            break;
          case 3:
            // self.createRouteModel.addMarkerToEnd(event.latLng);
            break;
          default:
            break;
        }
      });
      
      this.isNewRoute=true;
      this.directionPlan.createNewModelRoute(lastRoute);
    
  }

  onClickStart(){
    this.selectedInput=1;
    if(this.directionPlan.markerStart){
      this.map.setCenter(this.directionPlan.markerStart.getPosition());
      this.map.panTo(this.directionPlan.markerStart.getPosition());
    }
    
  }

  onClickEnd(){
    this.selectedInput=2;
    if(this.directionPlan.markerEnd){
      this.map.setCenter(this.directionPlan.markerEnd.getPosition());
      this.map.panTo(this.directionPlan.markerEnd.getPosition());
    }
  }



}
