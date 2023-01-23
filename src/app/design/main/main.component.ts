import { Component } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  menu: {type: string, name: string};
  gradeNum: number;
  showList = false;
  
  constructor(private designService: DesignService, private stuServ: StudentsService) {}

  ngOnInit() {
    this.designService.menuChanged.subscribe(menu => {
      this.menu = menu;
    })

    this.designService.gradeChanged.subscribe(gradeNum => {
      this.gradeNum = gradeNum;
    })

    this.stuServ.gradeActiveStatus.subscribe(status => {
      if (status) {
        this.gradeNum = null;
      }
    })

    this.stuServ.classActiveStatus.subscribe((status) => {
      this.showList = !status;
    });

    // this.designService.resetShowList.subscribe(status => {
    //   if (status) {
    //     this.showList = false;
    //     setTimeout(() => {
    //       this.showList = true;
    //     }, 2000)
    //   }
    // })
  }
}
