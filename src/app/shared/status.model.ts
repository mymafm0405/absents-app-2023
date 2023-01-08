import { Student } from './student.model';

export class Status {
  constructor(
    public id: string,
    public date: string,
    public gradeNum: number,
    public classNum: number,
    public students: Student[]
  ) {}
}
