import { IRouteLine } from '../classes/renders/IRouteLine';

export interface IRoutePainter{
    SelectedLine:IRouteLine;
    cleanRoute();
    paintRoute(res: google.maps.DirectionsResult) :void;
}