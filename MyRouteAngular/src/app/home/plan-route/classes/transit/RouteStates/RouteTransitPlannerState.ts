import { IRouteState } from '../../../interfaces/IRouteState';
import { RouteTransitMultipleRenderer } from '../RouteTransitMultipleRenderer';
import { RouteTransit } from '../RouteTransit';

import { IRouteLine } from '../../renders/IRouteLine';
import { TransitLine } from '../renders/TransitLine';
import { RouteState } from './RouteState';
import { RouteTransitState } from './RouteTransitState';


export class RouteTransitPlannerState extends RouteTransitState{
    
    private transitLines:TransitLine[]=[];
    private dataMas=[];
    private _infowindow:google.maps.InfoWindow;
   
    constructor(routeTransit:RouteTransit, markerStart:google.maps.Marker,markerEnd:google.maps.Marker){
        super(routeTransit);
        
        this.setMarkerStart(markerStart);
        this.setMarkerEnd(markerEnd);
    }



    public cleanRoute() {
        if(!this.transitLines){
            return;
        }
        while(this.transitLines.length>0){
            var removed=this.transitLines.pop();
            removed.eraseLine();
            removed.eraseShadow();
        }
    }
    public renderRoute(res:google.maps.DirectionsResult) {
        this.cleanRoute();
        this.dataMas=[];
        for(let i=0;i < res.routes.length; i++ ){
            var line=new TransitLine(this,this._routeTransit.Map,
                res.routes[i].legs[0].steps,i)
            if(this._routeTransit.SelectedRouteIndex==i){
                line.drawLine();
            }
            line.drawShadow();
            this.transitLines.push(line);

            var data={
                distance: res.routes[i].legs[0].distance,
                duration: res.routes[i].legs[0].duration,
                end_address:res.routes[i].legs[0].end_address,
                start_address: res.routes[i].legs[0].start_address,
                end_location: res.routes[i].legs[0].end_location,
                start_location: res.routes[i].legs[0].start_location
            };
            this.dataMas.push(data);
        }
    }
    public onClickRoute(position:google.maps.LatLng, routeLine:IRouteLine) {
        this._routeTransit.SelectedRouteIndex=routeLine.IndexRoute;
        this.transitLines.forEach(line => {
            line.drawShadow();
            if(line.IndexRoute==this._routeTransit.SelectedRouteIndex){
                line.drawLine();
            }
            else{
                line.eraseLine();
            }
        });

    
        var contentString =
            '<span>'+ this.dataMas[routeLine.IndexRoute].distance.text +'</span><br/>'+
            '<span>'+ this.dataMas[routeLine.IndexRoute].duration.text +'</span><br/>'+
            '<span>route: '+ routeLine.IndexRoute +'</span><br/>'+
            //'From: <span>'+ data[j].start_address +'</span><br/>'+
            //'To: <span>'+ data[j].end_address +'</span><br/>'+
            '';
        
            
        // it may be needed to close the previous infoWindow
        if(position!=null){
            if(this._infowindow) {
                this._infowindow.close();
                this._infowindow = null;
            }
            this._infowindow = new google.maps.InfoWindow({
                content: contentString,
                position: position,
            });
            this._infowindow.open(this._routeTransit.Map);
        }
    }

}