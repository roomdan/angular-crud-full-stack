import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  descriptionDisable: boolean = true;
  btnEditText: string = 'Edit';
  tasksData: any[] = [];

  //manage -responses
  _HTTP_responses:any[]=[];
  _ERROR:any[]=[];


  userData = new FormGroup({
    description: new FormControl(''),
    title: new FormControl(''),
    name: new FormControl(''),

  })

  editTask(id: number | string) {
    if (this.descriptionDisable) {
      this.descriptionDisable = false
      this.btnEditText = 'cancel'
      console.log(id);

    }
    else {
      this.descriptionDisable = true;
      this.btnEditText = 'Edit'
      console.log(id);

    }
  }

  //constructor object
  constructor(private _http: HttpClient) {
  }


  statusCharge: string | number | any = ''

  postData() {
    const postTask: Object = {
      user: this.userData.value.name,
      title: this.userData.value.title,
      task: this.userData.value.description
    };


    this._http.post('https://backend-tasks-node.herokuapp.com/v1/tasks', postTask)
      .subscribe((x:any) => {
        this._http.get('https://backend-tasks-node.herokuapp.com/v1/tasks')
          .subscribe((datas: any) => {
            this.tasksData = datas;
          });
      });
    this.tasksData = [...this.tasksData, postTask];
  };


  editData() {


  }

  deleteData(id: number | string) {

    "use strict"

    typeof id === 'string' ? Number(id) : id;

    this.tasksData = this.tasksData.filter(e => e.id !== id);
    this._http.delete('https://backend-tasks-node.herokuapp.com/v1/tasks'.concat(`/${id}`))
      .subscribe(data => {
        console.log(data);
      });
  };


  ngOnInit(): void {
    this._http.get('https://backend-tasks-node.herokuapp.com/v1/tasks')
      .subscribe((datas: any) => {
        this.tasksData = datas;
        console.log(this.tasksData);
      });
  };

}
