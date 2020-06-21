export class MarkerManager{

    static createMarker(map:google.maps.Map,location:google.maps.LatLng,pointType:PointTypes, resultCallback:(marker:google.maps.Marker)=>void) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });

        resultCallback(marker);
    }

}