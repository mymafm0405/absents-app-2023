import { Component, Input } from '@angular/core';
import { Class } from 'src/app/shared/class.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  @Input() currentClass: Class;
}
