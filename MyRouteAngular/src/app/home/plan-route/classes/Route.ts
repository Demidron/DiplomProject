
import { RoutePainter } from './RoutePainter';
import { IRoute } from '../interfaces/IRoute';
import { GmapService } from 'src/app/shared/gmap.service';

import { IRoutePainter } from '../interfaces/IRoutePainter';
import { ThrowStmt } from '@angular/compiler';
import { MarkerManager } from './MarkerManager';
import { IRouteState } from '../interfaces/IRouteState';
import { RouteStep } from './Details/RouteStep';
import { RouteDetail } from './Details/RouteDatail';

export abstract class Route implements IRoute{
   
    
    protected _travelMode:string;
    protected _routeState:IRouteState;
    protected _markerStart:google.maps.Marker;
    protected _markerEnd:google.maps.Marker;
    protected _directionsService:google.maps.DirectionsService;
    protected _map:google.maps.Map;
    protected _selectedRouteIndex;
    protected _dirResult:google.maps.DirectionsResult;
    public RouteDetails:RouteDetail[]=[];   
   

    constructor(map:google.maps.Map,
        public DateTimeStart:Date=new Date(Date.now()),
         selectedRouteIndex:number=0){
       this._selectedRouteIndex=selectedRouteIndex;
        // if (locationStartorMarker instanceof google.maps.LatLng){
        //     MarkerManager.createMarker(map,locationStartorMarker,PointTypes.travelPoint,(marker)=>{
        //         this.set_markerStart(marker);
        //     })
        // }
        // else if(locationStartorMarker instanceof google.maps.Marker){
        //     this.set_markerStart(locationStartorMarker);
        // }
        this._map=map;
        
        this._directionsService = new google.maps.DirectionsService;
    }
    // public getMarkerStart(): google.maps.Marker{
    //     return this._markerStart;
    // }
    // public getMarkerEnd(): google.maps.Marker{
    //     return  this._markerEnd;
    // }


    public set SelectedRouteIndex(selectedRouteIndex:number){
       this._selectedRouteIndex=selectedRouteIndex;
       this._routeState.renderRoute(this._dirResult);
    }
    public get SelectedRouteIndex():number{
        return this._selectedRouteIndex;
     }
    // public set LocationStart(location:google.maps.LatLng){
    //     this._locationStart=location;
    // }
    // public set LocationEnd(location:google.maps.LatLng){
    //     this._locationEnd=location;
    // }
    
    public get TravelMode():string{
        return this._travelMode;
    }
  
    public get Map() :  google.maps.Map {
        return this._map;
    }
    public get MarkerStart() : google.maps.Marker {
        return this._markerStart;
    }
    public set MarkerStart(markerStart: google.maps.Marker)  {
        this._markerStart=markerStart;
    }
    public get MarkerEnd(): google.maps.Marker {
        return this._markerEnd;
    }
    public set MarkerEnd(markerEnd: google.maps.Marker) {
        this._markerEnd=markerEnd;
    }


    public deleteRoute(){
        // if(this._markerStart){
        //     this._markerStart.setMap(null);
        // }
        // if(this._markerEnd){
        //     this._markerEnd.setMap(null);
        // }
        this._routeState.cleanRoute();
    }

    public set SelectedRoute(dirRoute:google.maps.DirectionsRoute){

    }


    abstract setState(state:IRouteState);
    abstract toUnselectedState(markerPrevRoute?:google.maps.Marker,markerNextRoute?:google.maps.Marker);
    abstract toSelectedState();
    abstract toPlannerState(markerStart:google.maps.Marker, markerEnd:google.maps.Marker);

    abstract updateRoute(resultCallback: (dirRes: google.maps.DirectionsResult) => void);
    abstract updateRouteDetails(routesMas: google.maps.DirectionsRoute[]);
}