import { IRouteState } from '../../../interfaces/IRouteState';
import { RouteTransitRenderer } from '../RouteTransitRenderer';
import { RouteTransit } from '../RouteTransit';

import { IRouteLine } from '../../renders/IRouteLine';
import { RouteState } from './RouteState';
import { RouteTransitState } from './RouteTransitState';
import { TransitLine } from '../renders/TransitLine';

export class RouteTransitUnselectedState extends RouteTransitState{
    private _directionsRenderer:google.maps.DirectionsRenderer;
    private transitLine:TransitLine;
    private data;
    constructor(routeTransit:RouteTransit, markerPrevRoute?:google.maps.Marker,markerNextRoute?:google.maps.Marker){
    
        super(routeTransit);
        if(markerPrevRoute){
            markerPrevRoute.setPosition(this._routeTransit.MarkerStart.getPosition())
            this.setMarkerStart(markerPrevRoute);
            // this._routeTransit.MarkerStart.setDraggable(false);
        }
        else{
            this._routeTransit.MarkerStart.setDraggable(false);
        }
        if(markerNextRoute){ 
            markerNextRoute.setPosition(this._routeTransit.MarkerEnd.getPosition());
            this.setMarkerEnd(markerNextRoute);
        }
        else{
            this._routeTransit.MarkerEnd.setDraggable(false);
        }
    }


    public cleanRoute() {
        if(this.transitLine){
           
            this.transitLine.eraseLine();
            this.transitLine.eraseShadow();
            this.transitLine=null;
        }
    }
    public renderRoute(res:google.maps.DirectionsResult) {
        this.cleanRoute();
        var rLeg=res.routes[this._routeTransit.SelectedRouteIndex].legs[0];
     
        var line=new TransitLine(this,this._routeTransit.Map,
            rLeg.steps,this._routeTransit.SelectedRouteIndex)
       
        line.drawLine();
        
        line.drawShadow();
        this.transitLine=line;

        var data={
            distance: rLeg.distance,
            duration: rLeg.duration,
            end_address:rLeg.end_address,
            start_address: rLeg.start_address,
            end_location: rLeg.end_location,
            start_location: rLeg.start_location
        };
        this.data=data;
        
    }
    public onClickRoute(latLng:google.maps.LatLng, routeLine:IRouteLine) {
        
    }

}