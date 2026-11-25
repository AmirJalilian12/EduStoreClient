import { IDeliveryMethod } from "./order";

export interface IUser{
    email? : string;
    userName : string;
    token : string;
    notionalCode? :string;
    displayName : string;
}
export type Login = {
    phoneNumber : string;
    password : string;
}
export type Register = {
    phoneNumber : string;
    password : string;
    displayName : string;
}
export interface IAddress{
    id : number;
    isMain : boolean;
    state : string;
    city : string;
    firstName : string;
    LastName? : string;
    fullAddress : string;
    number  : string;
    postalCode : string;
}
export interface ICheckoutFormBuilder{
    address? : IAddress;
    deliveryMethod? : IDeliveryMethod;
    portalType : number;
}
export interface IMedProfile{
 nationalCode? : string;   
 bloodGroup? : string;
}