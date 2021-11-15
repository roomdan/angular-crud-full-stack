import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()

export class GetDataTasks {

    data:any;

    constructor(private _GetTasks:HttpClient) {
        this._GetTasks.get('https://backend-tasks-node.herokuapp.com/v1/tasks')
        .subscribe(tasksData=>{
            this.data=tasksData;
        })
    }

    viewData(){
        console.log(this.data);
    }
}