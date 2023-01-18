import { Component, Input } from '@angular/core';
import { DesignService } from 'src/app/shared/design.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() menu: { type: string; name: string };

  constructor(private designService: DesignService) {}

  onMenuClick() {
    this.designService.menuChanged.next(this.menu);
  }
}
