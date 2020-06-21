import { RouteStep } from './RouteStep';

export class RouteDetail{
    public RouteStepsMas:RouteStep[]=[];
    public DepartureTime:Date;
    public ArrivalTime:Date;
    public Distance: google.maps.Distance;
    public Duration: google.maps.Duration;
    public StartAddress:string;
    public EndAddress:string;
}