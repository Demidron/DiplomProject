export class GeoService{
    static findMe(resultCallback:(latLng:google.maps.LatLng)=>void) {
        if (!navigator.geolocation) {
          alert("Geolocation is not supported by this browser.");
        }
        
        navigator.geolocation.getCurrentPosition(
            (position)=>{
              var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              console.log("My location: "+location );
              resultCallback( location);
    
            },
            (error)=>{console.log(`Error:  ${error}`);},
            {
                timeout: 10000,
                enableHighAccuracy: true,
                maximumAge: Infinity
            }
        );
    }
}