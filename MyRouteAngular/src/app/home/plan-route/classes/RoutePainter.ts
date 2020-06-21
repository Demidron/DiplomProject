import { IRoutePainter } from '../interfaces/IRoutePainter';
import { Route } from './Route';
import { IRouteLine } from './renders/IRouteLine';

export abstract class RoutePainter implements IRoutePainter{
    protected _route:Route;
    protected _selectedLine:IRouteLine;

    public set SelectedLine(selectedLine:IRouteLine){
        this._selectedLine=selectedLine;
        this._route.SelectedRouteIndex=selectedLine.IndexRoute;
    }
    public get SelectedLine():IRouteLine{
        return this._selectedLine;
    }
    constructor( route:Route)  {

        this._route=route;
      
    }
    abstract cleanRoute();
    abstract paintRoute(res: google.maps.DirectionsResult);
}