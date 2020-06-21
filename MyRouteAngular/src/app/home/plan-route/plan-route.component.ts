import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { faChevronDown,faPlusCircle,faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { GmapService } from 'src/app/shared/gmap.service';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';

import { Route } from './classes/Route';
import { RoutePainter } from './classes/RoutePainter';
import { RouteTransit } from './classes/transit/RouteTransit';
import { IRoute } from './interfaces/IRoute';

import { MarkerManager } from './classes/MarkerManager';
import { CreateRouteComponent } from './components/create-route/create-route.component';
@Component({
  selector: 'app-plan-route',
  templateUrl: './plan-route.component.html',
  styleUrls: ['./plan-route.component.css']
})
export class PlanRouteComponent implements OnInit,AfterViewInit {

  faChevronDown=faChevronDown;
  faPlusCircle=faPlusCircle;

  map: google.maps.Map;
  geocoder: google.maps.Geocoder;
  routesResults:google.maps.DirectionsRoute[];
  addressEnd;

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  @ViewChild('createRoute', {static: false}) createRoute: CreateRouteComponent;
  
  routes:IRoute[]=[];
 


  constructor(private gmapService: GmapService,private calendar: NgbCalendar) { }

  ngOnInit() {
 
  }
  EditRoute(index:number){

  }
  DeleteRoute(index:number){
    this.routes[index].deleteRoute();
    if(this.routes[index-1]&&this.routes[index+1]){
      
      this.routes[index-1].toUnselectedState(null,this.routes[index+1].MarkerStart);
    }else if(this.routes[index-1]){
      this.routes[index].MarkerEnd.setMap(null);
      if(this.routes[index-1].MarkerEnd!=this.routes[index].MarkerStart){
        this.routes[index].MarkerStart.setMap(null);
      }
    }
    else if(this.routes[index+1]){
      this.routes[index].MarkerStart.setMap(null);
      if(this.routes[index+1].MarkerStart!=this.routes[index].MarkerEnd){
        this.routes[index].MarkerEnd.setMap(null);
      }
    }
    else {
      this.routes[index].MarkerEnd.setMap(null);
      this.routes[index].MarkerStart.setMap(null);
    }
    this.routes.splice(index,1);
  }


  ngAfterViewInit(): void {
    
    this.mapInitializer();

  }
  mapInitializer() {

    
    setTimeout(()=> {

      this.geocoder = new google.maps.Geocoder;
      
      this.map = new google.maps.Map(this.gmap.nativeElement);
      this.createRoute.map= this.map;
      // this.createRoute.createMarkerStart();

      google.maps.Polyline.prototype.getBounds = function(startBounds) {
        var bounds;
        if(startBounds) {
            bounds = startBounds;
        }
        else {
            bounds = new google.maps.LatLngBounds();
        }
        this.getPath().forEach(function(item, index) {
            bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
        });
        return bounds;
      };
      // this.map.setOptions({draggableCursor:'url(../../../assets/icons/move.png), auto;'});
      // this.createNewRoute();
      // this.markerManager=new MarkerManager(this.map);

      var self=this;


    }, 1000);
 
  }



}
