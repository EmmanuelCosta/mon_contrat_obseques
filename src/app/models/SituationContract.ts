import * as models from './models';


export interface SituationContract {
      situationDate ?:string;
      state ?:string;
      isValidate?:boolean;
      actions?: Array<string>;

}
