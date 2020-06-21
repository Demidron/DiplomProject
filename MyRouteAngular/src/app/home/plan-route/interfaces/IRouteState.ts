import { IRoutePainter } from './IRoutePainter';
import { IRouteLine } from '../classes/renders/IRouteLine';

export interface IRouteState{
    
    renderRoute(res:google.maps.DirectionsResult);
    cleanRoute();
    onClickRoute(latLng:google.maps.LatLng, routeLine:IRouteLine);
}