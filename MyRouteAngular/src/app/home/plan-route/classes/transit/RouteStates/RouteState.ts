import { IRouteLine } from '../../renders/IRouteLine';
import { IRouteState } from '../../../interfaces/IRouteState';
import { IRoute } from '../../../interfaces/IRoute';

export abstract class RouteState implements IRouteState{
    abstract renderRoute(res: google.maps.DirectionsResult);
    abstract cleanRoute();
    abstract onClickRoute(latLng: google.maps.LatLng, routeLine: IRouteLine);
    private timerRefreshRoute;
    private _route:IRoute;
    constructor(route:IRoute){
        this._route=route;
 
    }
    protected setMarkerStart(marker:google.maps.Marker){
        if( this._route.MarkerStart){
            this._route.MarkerStart.setMap(null); 
        }

        google.maps.event.addListener(marker, 'position_changed',()=> {
            if(this.timerRefreshRoute){
                clearTimeout(this.timerRefreshRoute);
            }
            this.timerRefreshRoute=setTimeout(()=> {
                this._route.updateRoute(dirRes=>{});  
            },200);

        });
        
        this._route.MarkerStart=marker;

    }
    protected setMarkerEnd(marker:google.maps.Marker){

        if( this._route.MarkerEnd){
            this._route.MarkerEnd.setMap(null); 
        }
        google.maps.event.addListener(marker, 'position_changed',()=> {
            if(this.timerRefreshRoute){
                clearTimeout(this.timerRefreshRoute);
            }
            this.timerRefreshRoute=setTimeout(()=> {
                this._route.updateRoute(dirRes=>{});  
            },200);
        });
        this._route.MarkerEnd=marker;
        
      
    }

}