import {Injectable} from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class DesignService {
    menuChanged = new Subject<{type: string, name: string}>();
}