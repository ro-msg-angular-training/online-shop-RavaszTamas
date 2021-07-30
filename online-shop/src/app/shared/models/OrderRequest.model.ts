export interface OrderRequest {
    customer?:string
    products:({productId:number,quantity:number})[]
}