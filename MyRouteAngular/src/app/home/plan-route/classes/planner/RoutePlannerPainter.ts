// import { RoutePainter } from '../RoutePainter';

// export class RoutePlannerPainter extends RoutePainter{

//     polylines:google.maps.Polyline[][]=[];
//     shadows:google.maps.Polyline[]=[];
//     data=[];
//     infowindow:google.maps.InfoWindow;
//     public paintRoute(request: google.maps.DirectionsRequest, resultCallback: (geoRes: google.maps.DirectionsResult) => void) {
//         var self=this;
//         for(var j in  this.shadows) {
//             this.polylines[j].forEach(element => {
//                 element.setMap(null);
//             });
//             this.shadows[j].setMap(null);
//         }
//         this.polylines = [];
//         this.shadows = [];
//         this.data = [];
//         this.directionsService.route(request, 
//             function(response, status) {
//                 if (status != 'OK') {
//                     window.alert('Directions request failed due to ' + status);
//                     return;
//                 }
//                 var bounds = new google.maps.LatLngBounds();
//                 console.log(response.routes);
        
//                 for(let i=0;i < response.routes.length; i++ ) {
//                     // let's make the first suggestion highlighted;
//                     var hide = i==0 ? false : true;
//                     var shadow = self.drawPolylineShadow(response.routes[i].overview_path, '#666666',hide);
//                     self.shadows.push(shadow);
//                     var steps=response.routes[i].legs[0].steps;
//                     for (let i2 = 0; i2 < steps.length; i2++) {
                        
//                         var color;
//                         if(steps[i2].transit&&steps[i2].transit.line.color){
//                             color=steps[i2].transit.line.color
//                         }else{
//                             switch (steps[i2].travel_mode) {
//                                 case google.maps.TravelMode.TRANSIT:
//                                     color='#0000ff'
//                                     break;
//                                 case google.maps.TravelMode.WALKING:
//                                     color='#4dba2c'
//                                     break;
//                                 case google.maps.TravelMode.DRIVING:
//                                     color='#9c2ec3'
//                                     break;
//                                 case google.maps.TravelMode.BICYCLING:
//                                     color='#a33778'
//                                     break;
//                                 case google.maps.TravelMode.TWO_WHEELER:
//                                     color='#44c5b5'
//                                     break;
//                                 default:
//                                     break;
//                             }
//                         }
//                         var line:google.maps.Polyline = self.drawPolyline(steps[i2].path, color, hide);
//                         self.polylines.push([]);
//                         self.polylines[i].push(line);
//                     };
                   
                   
//                     // let's add some data for the infoWindow
//                     self.data.push({
//                         distance: response.routes[i].legs[0].distance,
//                         duration: response.routes[i].legs[0].duration,
//                         end_address: response.routes[i].legs[0].end_address,
//                         start_address: response.routes[i].legs[0].start_address,
//                         end_location: response.routes[i].legs[0].end_location,
//                         start_location: response.routes[i].legs[0].start_location
//                     });
//                     bounds = shadow.getBounds(bounds);//обновляет границу
//                     google.maps.event.addListener(shadow, 'click', function(e) {
//                         // detect which route was clicked on
//                         let index = self.shadows.indexOf(this);
//                         let position=null;
//                         if(e){
//                             position = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
//                         }     
//                         self.highlightRoute(index,position);
//                     });

//                 }
                
//                 self.map.fitBounds(bounds);

//                 console.log("OK result");
//                 resultCallback(response);
                
//             }
//         );
//     }

//     private highlightRoute(index,position:google.maps.LatLng) {
//         for(var j in  this.polylines ) {
//             if(j==index) {
//                 //var color = '#0000ff';
//                 this.polylines[j].forEach(element => {
//                     element.setMap(this.map);
//                 });
//                 this.shadows[j].setMap(null);
//                 // feel free to customise this string
//                 var contentString =
//                     '<span>'+ this.data[j].distance.text +'</span><br/>'+
//                     '<span>'+ this.data[j].duration.text +'</span><br/>'+
//                     '<span>route: '+ j +'</span><br/>'+
//                     //'From: <span>'+ data[j].start_address +'</span><br/>'+
//                     //'To: <span>'+ data[j].end_address +'</span><br/>'+
//                     '';
                
                  
//                 // it may be needed to close the previous infoWindow
//                 if(position!=null){
//                     if(this.infowindow) {
//                         this.infowindow.close();
//                         this.infowindow = null;
//                     }
//                     this.infowindow = new google.maps.InfoWindow({
//                         content: contentString,
//                         position: position,
//                     });
//                     this.infowindow.open(this.map);
//                 }
//             }
//             else {  
//                 this.shadows[j].setMap(this.map);
//                 this.polylines[j].forEach(element => {
//                     element.setMap(null);
//                 });
//             }
//         }
//     }
//     private drawPolyline(path, color, hide) {
//         var line = new google.maps.Polyline({
//             path: path,
//             strokeColor: color,
//             strokeOpacity: 0.9,
//             strokeWeight: 3
//         });
//         if(! hide) {
//             line.setMap(this.map);
//         }
//         return line;
//     }
//     private drawPolylineShadow(path, color, hide) {
//         var line = new google.maps.Polyline({
//             path: path,
//             strokeColor: color,
//             strokeOpacity: 0.4,
//             strokeWeight: 7
//         });
     
//             line.setMap(this.map);
        
//         return line;
//     }
// }