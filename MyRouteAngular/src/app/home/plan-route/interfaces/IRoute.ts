import { RouteDetail } from '../classes/Details/RouteDatail';

export interface IRoute{
    TravelMode:string;
    DateTimeStart:Date;
    RouteDetails:RouteDetail[];
    SelectedRouteIndex:number;
    MarkerStart:google.maps.Marker;
    MarkerEnd:google.maps.Marker;

    toUnselectedState(markerPrevRoute?:google.maps.Marker,markerNextRoute?:google.maps.Marker);
    toSelectedState();
    toPlannerState(markerStart:google.maps.Marker, markerEnd:google.maps.Marker);
    deleteRoute();
    updateRoute(resultCallback: (routesMas: google.maps.DirectionsResult) => void);
    updateRouteDetails(routesMas: google.maps.DirectionsRoute[]);
}