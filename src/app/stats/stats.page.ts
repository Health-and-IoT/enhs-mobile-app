import { Component, OnInit } from '@angular/core';
import {Papa } from 'ngx-papaparse';
import {HttpClient} from '@angular/common/http';
import { ɵangular_packages_platform_browser_dynamic_platform_browser_dynamic_a } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  CsvData: any[] = [];
  headerRow : any[] = [];
  constructor(private http:HttpClient,private papa:Papa) {
    this.loadCSV();
   }

  ngOnInit() {
  }

  private loadCSV(){
    this.http.get("../assets/icon/testing1.csv",{
      responseType: 'text'
    }).subscribe(
      data => this.extractdata(data),
      err => console.log('error', err)
    )
    }

    extractdata(res){
      let CsvData = res || "";

      this.papa.parse(CsvData,{
        complete: parsedData =>{
          this.headerRow = parsedData.data.splice(0,1)[0];
          this.CsvData = parsedData.data;
        }
      })
    }

   

}
