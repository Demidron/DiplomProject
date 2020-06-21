import { RouteState } from './RouteState';
import { RouteTransit } from '../RouteTransit';
import { IRouteLine } from '../../renders/IRouteLine';

export abstract class RouteTransitState extends RouteState{

    protected _routeTransit:RouteTransit;
    constructor(routeTransit:RouteTransit){
        super(routeTransit);
        this._routeTransit=routeTransit;
    }
    abstract renderRoute(res: google.maps.DirectionsResult);
    abstract cleanRoute();
    abstract onClickRoute(latLng: google.maps.LatLng, routeLine: IRouteLine);
}

