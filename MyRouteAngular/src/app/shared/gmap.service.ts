import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  geocoder: google.maps.Geocoder;
  constructor(private http:HttpClient) { 
    setTimeout(()=> { this.geocoder=new google.maps.Geocoder;},1000);
   
  }

  // key="AIzaSyDWKtzrxuvKJAMoJr1IsDF7dE3XNdo2MEU";

  // getAddress(lat,lng) {
  //   return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?" + 'latlng='+lat+','+lng+'&key=AIzaSyDWKtzrxuvKJAMoJr1IsDF7dE3XNdo2MEU');
  // }

  geocodeAddress(location, resultCallback:(geoRes:google.maps.GeocoderResult[])=>void) {
       
    this.geocoder.geocode({'location': location}, function(results, status) {
      if (status === 'OK') {     
          resultCallback(results);
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  
  }

}
