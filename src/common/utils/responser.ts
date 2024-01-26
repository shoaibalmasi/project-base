export class Responser  {
  public readonly success : boolean;
  public readonly message : string;
  public readonly data: any;
  public readonly status : number;
  public readonly date : Date;
  public readonly path : string;
  public readonly error : any;
  constructor(input: {result?: any , status?: number, message?: string, success?: boolean, path?: string, error?: any}) {
    this.status = input.status || 200;
    this.success = input.success === false ? false : true;
    this.message = input.message || 'درخواست انجام شد';
    this.data = input.result || {} 
    this.date = new Date()
    this.path = input.path || ''
    this.error = input.error || null
  }
}
