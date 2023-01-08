export class Student {
  constructor(
    public id: string,
    public name: string,
    public gradeNum: number,
    public classNum: number,
    public phone: number,
    public absent: boolean,
    public late: boolean,
    public reason: string,
    public date: string
  ) {}
}
