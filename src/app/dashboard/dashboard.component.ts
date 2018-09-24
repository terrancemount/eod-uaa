import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showElectrical:boolean = true;
  showNaturalGas:boolean = true;
  showOutsideTemp:boolean = true;
  buildingId:number = 31;


  constructor(private route: ActivatedRoute) {
    this.buildingId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }
}
