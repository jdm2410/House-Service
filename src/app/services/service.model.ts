import { Receipt } from "../request/receiptmodel.model";

export  class Service {
   public name: string;
   public description: string;
   public quickDesc: string;
   public imagePath: string;
   public price: number;
   public serviceId: number;
   public category: string;

   constructor(name: string,desc:string,quickDesc: string,imagePath:string, price: number, serviceId: number, category: string){
        this.name = name;
        this.description = desc;
        this.quickDesc = quickDesc;
        this.imagePath = imagePath;
        this.price = price;
        this.serviceId = serviceId;
        this.category = category;
   }
}