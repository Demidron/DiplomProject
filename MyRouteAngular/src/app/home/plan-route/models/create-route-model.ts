import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IRoute } from '../interfaces/IRoute';
import { MarkerManager } from '../classes/MarkerManager';
import { GmapService } from 'src/app/shared/gmap.service';

import { RoutePainter } from '../classes/RoutePainter';

export class CreateRouteModel{
    dpModel: NgbDateStruct;
    markDisabled;
    dateTimeStart = {hour: 13, minute: 30};
    travelMode:string ="TRANSIT";
    addressStart:string;
    addressEnd:string;

    isContinueRoute:boolean=true;

    
    constructor(private calendar: NgbCalendar){
        this.markDisabled = (date: NgbDate) => date.before(calendar.getToday());
        this.selectDateTimeNow();
    }
    getDateTime(){
        var date=new Date(this.dpModel.year,this.dpModel.month,
            this.dpModel.day,this.dateTimeStart.hour,this.dateTimeStart.minute);
            return date;
    }
    setDateTime(date:Date){
        this.dateTimeStart.hour = date.getHours();
        this.dateTimeStart.minute = date.getMinutes();
        this.dateTimeStart.minute = date.getMinutes();
        this.dpModel.day=date.getDay();
        this.dpModel.month=date.getMonth();
        this.dpModel.year=date.getFullYear();
    }
    selectDateTimeNow(){
        this.dpModel = this.calendar.getToday();
        var dateNow=new Date(Date.now());
        this.dateTimeStart.hour=dateNow.getHours();
        this.dateTimeStart.minute = dateNow.getMinutes();
        this.markDisabled = (date: NgbDate) => date.before(this.calendar.getToday());
    }

}