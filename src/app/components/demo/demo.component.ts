import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  contentLoaded = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 4000);
  }

}
