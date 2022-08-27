import { Receipt } from "../request/receiptmodel.model";

export  class Service {
   public name!: string;
   public description!: string;
   public quickDesc!: string;
   public imagePath!: string;
   public price!: number;

   constructor(name: string,desc:string,quickDesc: string,imagePath:string, price: number){
        this.name = name;
        this.description = desc;
        this.quickDesc = quickDesc;
        this.imagePath = imagePath;
        this.price = price;
   }
}