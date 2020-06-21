import { RoutePainter } from '../RoutePainter';
import { Route } from '../Route';

export class RouteTransitRenderer extends RoutePainter {

    protected directionsRenderer:google.maps.DirectionsRenderer;

    cleanRoute() {
        this.directionsRenderer.setMap(null);
    }

    public paintRoute(res:google.maps.DirectionsResult) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            // draggable: true,
            map: this._route.Map,
            suppressMarkers: true,
            routeIndex: this._route.SelectedRouteIndex
        });
        this.directionsRenderer.setDirections(res);
    }
}