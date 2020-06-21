import { CreateRouteComponent } from '../components/create-route/create-route.component';
import { MarkerManager } from './MarkerManager';
import { IRoute } from '../interfaces/IRoute';
import { GeoService } from 'src/app/services/GeoService';
import { RouteTransit } from './transit/RouteTransit';
import { RouteTransitMultipleRenderer } from './transit/RouteTransitMultipleRenderer';
import { RouteTransitUnselectedState } from './transit/RouteStates/RouteTransitUnselectedState';
import { CreateRouteModel } from '../models/create-route-model';

export class DirectionPlan{
    public markerStart:google.maps.Marker;
    public markerEnd:google.maps.Marker;
    dateTimeStart:Date=new Date(Date.now());
    private createRouteComponent:CreateRouteComponent
    private newRoute:IRoute=null;

    private prevRoute:IRoute;
    private nextRoute:IRoute;
    constructor(createRoute:CreateRouteComponent){
        this.createRouteComponent=createRoute;
        // this.newRoute.routesResults[0].legs[0].steps[0].
        // var nr:RouteTransit;
        
    }
    public setDateTimeStart(date: Date) {
        this.dateTimeStart=date;
    }
    public onClickRoute(i:number){
        this.newRoute.SelectedRouteIndex=i;
    }
    public onContinueModeChange(){
        if(this.createRouteComponent.createRouteModel.isContinueRoute){
            this.setMarkerStart(this.prevRoute.MarkerEnd.getPosition());
            this.markerStart.setDraggable(false);
            if(this.createRouteComponent.createRouteModel.getDateTime()<this.prevRoute.DateTimeStart){
                this.createRouteComponent.createRouteModel.setDateTime(this.prevRoute.RouteDetails[this.prevRoute.SelectedRouteIndex].ArrivalTime);
            }
           
            this.refreshNewRoute();
        }
        else{
            if(this.markerStart)
            {
                this.markerStart.setDraggable(false);
                
            }
        }
    }
    public addNewRoute(){ //When click add route on form
        if(!this.newRoute)
            return;

        this.newRoute.toUnselectedState(this.prevRoute?this.prevRoute.MarkerEnd :null,this.nextRoute?this.nextRoute.MarkerStart :null);
        this.createRouteComponent.selectedRoute.emit(this.newRoute)
        this.newRoute=null;
        this.createRouteComponent.isNewRoute=false;
        this.createRouteComponent.isVarRoute=false;
        this.createRouteComponent.createRouteModel=new CreateRouteModel(this.createRouteComponent.calendar);
        this.markerStart=null;
        this.markerEnd=null;
    }
    public setMarkerStart(location:google.maps.LatLng){//create marker
        
        if(this.markerStart){
            this.markerStart.setPosition(location);
        }else{
            
            MarkerManager.createMarker(this.createRouteComponent.map,location,PointTypes.PLANPOINT,(marker)=>{
                this.markerStart=marker;
                this.createRouteComponent.map.setZoom(11);
                this.createRouteComponent.map.panTo(this.markerStart.getPosition());
                google.maps.event.addListener(marker, 'dragend',()=> {
                    this.refreshNewRoute();  
                    this.geocode( this.markerStart.getPosition(),(res)=>{ this.createRouteComponent.createRouteModel.addressStart=res});
                });
            })
        }
        this.geocode( this.markerStart.getPosition(),(res)=>{ this.createRouteComponent.createRouteModel.addressStart=res});
        this.refreshNewRoute();  
    }
    public setMarkerEnd(location:google.maps.LatLng){
        if(this.markerEnd){
            this.markerEnd.setPosition(location);
        }else{
            MarkerManager.createMarker(this.createRouteComponent.map,location,PointTypes.PLANPOINT,(marker)=>{
                this.markerEnd=marker;
                this.createRouteComponent.map.setZoom(11);
                this.createRouteComponent.map.panTo(this.markerEnd.getPosition());
                google.maps.event.addListener(marker, 'dragend',()=> {
                    this.refreshNewRoute();  
                    this.geocode( this.markerEnd.getPosition(),(res)=>{this.createRouteComponent.createRouteModel.addressEnd=res});
                });
            })
        }
        this.geocode( this.markerEnd.getPosition(),(res)=>{this.createRouteComponent.createRouteModel.addressEnd=res});
        this.refreshNewRoute();  
    }
    public createNewModelRoute(lastRoute?:IRoute){ //When textbox click on map 
     var self=this;

        if(lastRoute&&this.createRouteComponent.createRouteModel.isContinueRoute){  
            this.prevRoute=lastRoute;
            var pos=lastRoute.MarkerEnd.getPosition();
            this.geocode(pos,(geocoderResults)=>{
                this.createRouteComponent.createRouteModel.addressStart=geocoderResults;
                this.setMarkerStart( pos);
                });
          
            this.createRouteComponent.createRouteModel.travelMode = lastRoute.TravelMode;
            this.createRouteComponent.createRouteModel.setDateTime(lastRoute.RouteDetails[lastRoute.SelectedRouteIndex].ArrivalTime);
            this.createRouteComponent.map.setZoom(11);
            this.createRouteComponent.map.panTo(lastRoute.MarkerEnd.getPosition());
    
        }else{
            this.createRouteComponent.createRouteModel.isContinueRoute=false;
          GeoService.findMe(function(resultLocation){
            self.geocode(resultLocation,(geocoderResults)=>{
                self.createRouteComponent.createRouteModel.addressStart=geocoderResults;
                self.setMarkerStart(resultLocation);
                });
            });
        }
    }
    public geocode(location:google.maps.LatLng, resultCallback:(address:string)=>void){
        this.createRouteComponent.gmapService.geocodeAddress(location,(geocoderResults)=>{
            if (geocoderResults[0]) {
               
                resultCallback(geocoderResults[1].formatted_address);
            }
            else{
                window.alert('geocoder results not found');
                resultCallback(null);
            }
        })
    }

    public onSubmitRoute(){
        if(!this.markerStart||!this.markerEnd){
            console.log("not all markers");
            return;
        }
        this.createRouteComponent.isVarRoute=!this.createRouteComponent.isVarRoute;
        this.refreshNewRoute();
    }
    private refreshNewRoute(){ //called when marker or model changed
        if(!this.markerStart||!this.markerEnd){
            console.log("not all markers");
            return;
        }
        
        var date=this.createRouteComponent.createRouteModel.getDateTime();
        if(!this.newRoute){
            this.updateRouteByTravelMode(date);
        }else if(this.newRoute.TravelMode!=this.createRouteComponent.createRouteModel.travelMode){
            this.updateRouteByTravelMode(date);
        }
        else{
            this.newRoute.DateTimeStart=date;
            this.newRoute.updateRoute(res=>{ });
        }
            
   
    }

    private updateRouteByTravelMode(date:Date){
        switch (this.createRouteComponent.createRouteModel.travelMode) {
            case "TRANSIT":
                if( !(this.newRoute as RouteTransit)){
                    this.newRoute=new RouteTransit(this.createRouteComponent.map,date);
                    this.newRoute.toPlannerState(this.markerStart,this.markerEnd);
                }
                break;
        
            default:
                console.log("dont have selected travelMode");
                break;
        }    
    }

}