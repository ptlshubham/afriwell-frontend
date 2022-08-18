export class Address {
    constructor(
        public id?: number,
        public userid?: string,
        public username?: string,
        public name?: string,
        public contactnumber?: number,
        public pincode?: string,
        public locality?: string,
        public address?: string,
        public city?: string,
        public state?: string,
        public landmark?: string,
        public alternativeno?: string,
        public createddate?: Date,
        public updateddate?: Date,
        public selected?: boolean,
        public transactionid?: number,
        public parentid?: number,
        public modofpayment?: any,
        public orderdate?: Date,
        public deliverydate?: Date,
        public productid?:any[],
        public total?:any,
        public status?:any,
        public quantity?:any,
        public size?: any,
        public addSelectFields?:any[],
        public soldquantity?:any,
        public stockdate?:Date,
        public addressId?:number

    ) {
    }
}