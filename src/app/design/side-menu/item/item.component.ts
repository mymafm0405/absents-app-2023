import { Component, Input } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';
import { StudentsService } from 'src/app/shared/students.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() menu: { type: string; name: string };

  constructor(
    private designService: DesignService,
    private studServ: StudentsService
  ) {}

  onMenuClick() {
    this.designService.menuChanged.next(this.menu);

    // This to make sure that report component will display the normal report and not the student report
    this.studServ.clearStudentSummary();
  }
}
