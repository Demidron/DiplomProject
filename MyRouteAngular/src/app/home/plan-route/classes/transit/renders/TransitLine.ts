
import { Route } from '../../Route';
import { IRouteLine } from '../../renders/IRouteLine';
import { RoutePainter } from '../../RoutePainter';
import { RouteTransitState } from '../RouteStates/RouteTransitState';


export class TransitLine implements IRouteLine {
    private _polylines:google.maps.Polyline[]=[];
    private _shadows:google.maps.Polyline[]=[];
    // private _data;
    // private _infowindow:google.maps.InfoWindow;
    private _map;

    private _dirSteps:google.maps.DirectionsStep[];
    private _indexRoute:number;
    private _routeState:RouteTransitState;

    constructor(routeState:RouteTransitState,map:google.maps.Map,dirSteps:google.maps.DirectionsStep[], indexRoute:number){
        this._routeState=routeState;
        this._map=map;
        this._indexRoute=indexRoute;
        this._dirSteps=dirSteps;
        this.renderLine();
    }

    public get IndexRoute(){
        return this._indexRoute;
    }
    public set IndexRoute(indexRoute:number){
       this._indexRoute=indexRoute;
    }
    public drawLine(){
        this._polylines.forEach(element => {
            element.setMap(this._map);
        });
    }
    public eraseLine() {
        this._polylines.forEach(element => {
            element.setMap(null);
        });
    }
    public drawShadow(){
        this._shadows.forEach(element => {
            element.setMap(this._map);
        });
    }
    public eraseShadow() {
        this._shadows.forEach(element => {
            element.setMap(null);
        });
    }
    private getColorFromStep(dirStep:google.maps.DirectionsStep):string{
        var color:string;
        if(dirStep.transit&&dirStep.transit.line.color){
            color=dirStep.transit.line.color
        }else{
            switch (dirStep.travel_mode) {
                case google.maps.TravelMode.TRANSIT:
                    color=ColorsRouteLines.TRANSIT;
                    break;
                case google.maps.TravelMode.WALKING:
                    color=ColorsRouteLines.WALKING;
                    break;
                case google.maps.TravelMode.DRIVING:
                    color=ColorsRouteLines.DRIVING;
                    break;
                case google.maps.TravelMode.BICYCLING:
                    color=ColorsRouteLines.BICYCLING;
                    break;
                case google.maps.TravelMode.TWO_WHEELER:
                    color=ColorsRouteLines.TWO_WHEELER;
                    break;
                default:
                    break;
            }
        }
        return color;
    }
    private renderLine(){
        // var steps=this._dirSteps;
        var bounds;
        var self=this;
        for (let i = 0; i < this._dirSteps.length; i++) {
            var color=this.getColorFromStep(this._dirSteps[i]);
           
            var shadow:google.maps.Polyline = new google.maps.Polyline({
                path: this._dirSteps[i].path,
                strokeColor: ColorsRouteLines.SHADOW,
                strokeOpacity: 0.4,
                strokeWeight: 7
            });

            bounds = shadow.getBounds(bounds);//обновляет границу карты
            google.maps.event.addListener(shadow, 'click', function(e) {
                
                let position=null;
                if(e){
                    position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                    self._routeState.onClickRoute(position,self);
                }
            });
            var line:google.maps.Polyline = new google.maps.Polyline({
                path: this._dirSteps[i].path,
                strokeColor: color,
                strokeOpacity: 0.9,
                strokeWeight: 7
            });
            google.maps.event.addListener(line, 'click', function(e) {
                
                let position=null;
                if(e){
                    position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                    self._routeState.onClickRoute(position,self);
                }
            });
            this._polylines.push(line);
            this._shadows.push(shadow);
        };
        // add some data for the infoWindow
        // this._data={
        //     distance: this._dirRoute.legs[0].distance,
        //     duration: this._dirRoute.legs[0].duration,
        //     end_address: this._dirRoute.legs[0].end_address,
        //     start_address: this._dirRoute.legs[0].start_address,
        //     end_location: this._dirRoute.legs[0].end_location,
        //     start_location: this._dirRoute.legs[0].start_location
        // };
    }
    private drawPolyline(path, color, hide) {
        var line = new google.maps.Polyline({
            path: path,
            strokeColor: color,
            strokeOpacity: 0.9,
            strokeWeight: 3
        });
        if(!hide) {
            line.setMap(this._map);
        }
        return line;
    }
    private drawPolylineShadow(path, color,hide) {
        var line = new google.maps.Polyline({
            path: path,
            strokeColor: color,
            strokeOpacity: 0.4,
            strokeWeight: 7
        });
     
        if(!hide) {
            line.setMap(this._map);
        }
        return line;
    }
    private highlightRoute(position:google.maps.LatLng) {
 
        // if(this._indexRoute!=this._routePainter.SelectedLine.IndexRoute) {
        //     //var color = '#0000ff';
        //     this._polylines.forEach(element => {
        //         element.setMap(this._map);
        //     });

        //     this._shadows.forEach(element => {
        //         element.setMap(null);
        //     });

        // }
        // feel free to customise this string
        // var contentString =
        //     '<span>'+ this._data.distance.text +'</span><br/>'+
        //     '<span>'+ this._data.duration.text +'</span><br/>'+
        //     '<span>route: '+ this._indexRoute +'</span><br/>'+
        //     //'From: <span>'+ data[j].start_address +'</span><br/>'+
        //     //'To: <span>'+ data[j].end_address +'</span><br/>'+
        //     '';
        
            
        // // it may be needed to close the previous infoWindow
        // if(position!=null){
        //     if(this._infowindow) {
        //         this._infowindow.close();
        //         this._infowindow = null;
        //     }
        //     this._infowindow = new google.maps.InfoWindow({
        //         content: contentString,
        //         position: position,
        //     });
        //     this._infowindow.open(this._map);
        // }
        
    
    }
}