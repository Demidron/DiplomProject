import { IRouteState } from '../../../interfaces/IRouteState';
import { RouteTransit } from '../RouteTransit';

import { IRouteLine } from '../../renders/IRouteLine';
import { RouteTransitState } from './RouteTransitState';

export class RouteTransitSelectedState extends RouteTransitState{
    private _directionsRenderer:google.maps.DirectionsRenderer;

    constructor(routeTransit:RouteTransit){
       super(routeTransit);
    }

    public cleanRoute() {
        this._directionsRenderer.setMap(null);
    }

    public renderRoute(res:google.maps.DirectionsResult) {
        if(this._directionsRenderer){
            this._directionsRenderer.setMap(null);
        }
        this._directionsRenderer = new google.maps.DirectionsRenderer({
            // draggable: true,
            map: this._routeTransit.Map,
            suppressMarkers: true,
            routeIndex: this._routeTransit.SelectedRouteIndex,
            preserveViewport:true
        });
        this._directionsRenderer.setDirections(res);
        
    }
    public onClickRoute(latLng:google.maps.LatLng, routeLine:IRouteLine) {
        throw new Error("Method not implemented.");
    }

}