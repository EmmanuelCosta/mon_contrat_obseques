import * as models from './models';
import { SituationContract } from './SituationContract';


export interface Contract {
  code?: string;
  commercialLoadSP?: number;
  commercialLoadRP?: number;
  commercialLoadLP?: number;
  registrationDate?: string;
  effectiveDate?: string;
  initialCapital?: number;
  reductionCapital?: number;
  deposit?: number;
  dueCapital?: number;
  technicalProductName?: string;
  premiumType?: string;
  splittingName?: string;
  paymentDuration?: number;
  funeralHomeCode?: string;
  guaranteeExec?: boolean;
  isGranteeSpouseOrHeir?: boolean;
  situation?: string;
  situationContract?: SituationContract;
  tarif?: number;
  registrationFees?:number;
  isEndorsement?:boolean;
  paymentDay?: string;
  firstPaymentType?:string;
  sinisterDate?:string;
  sinisterAmount?:number;
  hasAssistance?:boolean;
  checkNumber?:string;
  commercialTechnicalName?:string;
}
