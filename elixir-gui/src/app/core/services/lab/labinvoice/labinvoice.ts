import Labinvoiceserviceitem from './labinvoiceserviceitem';
export default class Labinvoice {
    id: number;
    patient_id:number;
    patient_name:string;
    patient_age:string;
    patient_gender:string;
    patient_number:string;
    patientmail:string;
    date:Date;
    payment_mode:string;
    total_cost:number;
    servicesList:Labinvoiceserviceitem[];
    services:string;
    advance:number;
    discount_amt:number;
    discount_percent:number;
    due_amt:number;
  }


