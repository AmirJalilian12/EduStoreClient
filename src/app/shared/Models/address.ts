export interface IAddress{
    id : number;
    isMain : boolean;
    state : string;
    city : string;
    firstName : string;
    fullAddress : string;
    lastName? : string;
    number : string;
    postalCode : string;
}
export interface IShippToAddress{
    isMain : boolean;
    state : string ;
    city : string;
    firstName : string;
    lastName? : string;
    fullAddress : string;
    number : string;
    postalCode : string;
}
