export class Student {
  constructor(
    public id: string,
    public name: string,
    public gradeNum: number,
    public classNum: number,
    public phone: string,
    public absent: boolean,
    public late: boolean,
    public reason: string,
    public active: boolean,
  ) {}
}
