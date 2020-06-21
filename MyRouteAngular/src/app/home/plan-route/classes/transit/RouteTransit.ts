import { Route } from '../Route';
import { RouteStep } from '../Details/RouteStep';

import { combineAll } from 'rxjs/operators';
import { GmapService } from 'src/app/shared/gmap.service';
import { RouteTransitRenderer } from './RouteTransitRenderer';
import { RouteTransitMultipleRenderer } from './RouteTransitMultipleRenderer';

import { RouteTransitUnselectedState } from './RouteStates/RouteTransitUnselectedState';
import { RouteTransitSelectedState } from './RouteStates/RouteTransitSelectedState';
import { RouteTransitPlannerState } from './RouteStates/RouteTransitPlannerState';
import { RouteDetail } from '../Details/RouteDatail';
import { IRouteState } from '../../interfaces/IRouteState';

export class RouteTransit extends Route {

  constructor(map:google.maps.Map,dateTimeStart?:Date){
    super(map,dateTimeStart);
    this._travelMode= google.maps.TravelMode.TRANSIT;
    console.log(this._travelMode);
   
  }
  
  setState(state:IRouteState) {//rename to setPlannerMode or etc
   this._routeState=state;

  }
  public toUnselectedState(markerPrevRoute?:google.maps.Marker,markerNextRoute?:google.maps.Marker){
    if(this._routeState){
      this._routeState.cleanRoute()
    };
   
   
    this._routeState=new RouteTransitUnselectedState(this,markerPrevRoute,markerNextRoute);
    
    this.updateRoute(res=>{
      // this._routeState.renderRoute(res);
    })
  }
  public toSelectedState()
  {


  }
    
  public toPlannerState(markerStart:google.maps.Marker, markerEnd:google.maps.Marker){


    this._routeState=new RouteTransitPlannerState(this, markerStart,markerEnd);
    
    this.updateRoute(res=>{
      // this._routeState.renderRoute(res);
    })
  }

  public updateRoute(resultCallback: (routesMas: google.maps.DirectionsResult) => void) { //resultCallback: (routesMas: google.maps.DirectionsResult) => void
    var request={
      origin:this._markerStart.getPosition(),
      destination:this._markerEnd.getPosition(),
      travelMode:this._travelMode as google.maps.TravelMode,
      provideRouteAlternatives:true,
      transitOptions: {
        departureTime: this.DateTimeStart, 
        modes: [google.maps.TransitMode.BUS,google.maps.TransitMode.SUBWAY,google.maps.TransitMode.TRAIN,google.maps.TransitMode.TRAM,google.maps.TransitMode.RAIL],
      }   
    }
    var self=this;
    this._directionsService.route(request, 
      function(response, status) {
          if (status != 'OK') {
              window.alert('Directions request failed due to ' + status);
              return;
          }
          console.log(response);
          self.updateRouteDetails(response.routes);
          if(self._routeState){
            self._routeState.renderRoute(response);
          }
          self._dirResult=response;
         
        
         
          resultCallback(response);
       
      }
    );
    
  }
  public updateRouteDetails(routesMas: google.maps.DirectionsRoute[]){
    if( this.RouteDetails){
      this.RouteDetails=[];
    }
    routesMas.forEach(route => {
      var rd=new RouteDetail();
      rd.Distance=route.legs[0].distance;
      rd.Duration=route.legs[0].duration;
      rd.ArrivalTime=route.legs[0].arrival_time.value;
      
      rd.DepartureTime=route.legs[0].departure_time.value;
      rd.StartAddress= route.legs[0].start_address;
      rd.EndAddress=route.legs[0].end_address;
    
      for (let i = 0; i<  route.legs[0].steps.length; i++) {
        var step = route.legs[0].steps[i];
        var rs:RouteStep=new RouteStep();
        rs.DistanceText=step.distance.text;
        rs.DurationText=step.duration.text;
        
        rs.Instructions=step.instructions;
        rs.TravelMode=step.travel_mode;
        if (step.transit) {
          rs.ArrivalTime=step.transit.arrival_time.value;
          rs.DepartureTime=step.transit.departure_time.value;
          rs.DepartureStop=step.transit.departure_stop.name;
          rs.ArrivalStop=step.transit.arrival_stop.name;
          if(step.transit.line.vehicle.local_icon)
          {
            rs.Icon=step.transit.line.vehicle.local_icon;
          }
          else rs.Icon=step.transit.line.vehicle.icon;
        }else{
          if(rd.RouteStepsMas.length>0){
            var lastRS=rd.RouteStepsMas[rd.RouteStepsMas.length-1];
            rs.DepartureTime=lastRS.ArrivalTime;
            rs.DepartureStop=lastRS.ArrivalStop;
          }
          else{
            rs.DepartureTime=rd.DepartureTime;
            rs.DepartureStop=rd.StartAddress;
          }

          // rs.ArrivalTime.setTime(lastRS.ArrivalTime.getDate()+rs.Duration.value);
        }
        
        rd.RouteStepsMas.push(rs);
      }

      this.RouteDetails.push(rd);
      // console.log(this.RouteDetails);
    });

  }

}