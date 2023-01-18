import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  menu: {type: string, name: string};
  
  constructor(private designService: DesignService) {}

  ngOnInit() {
    this.designService.menuChanged.subscribe(menu => {
      this.menu = menu;
    })
  }
}
