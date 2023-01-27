export class User {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public name: string,
    public grade: number[],
    public classes: number[],
    public type: string
  ) {}
}
