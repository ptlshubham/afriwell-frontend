import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ShiprocketService {

  constructor(
    private http: HttpClient,
  ) {

  }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  loginShiprocket() {
    let data = {
      email: "ptlshubham02@gmail.com",
      password: "Prnv@3850"
    };
     
    this.http.post("https://apiv2.shiprocket.in/v1/external/auth/login", data).toPromise().then((res: any) => {
      localStorage.setItem("shipToken", res.token);
    });
  }
  //create/Update order
  placingOrder(data) {
     
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", data, this.httpOption);
  }
  updatePickupLocatoion(data: any, orderId) {
    let data1: any;
    data1 = {
      order_id: ["'" + orderId + "'"],
      pickup_location: data
    };
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.patch('https://apiv2.shiprocket.in/v1/external/orders/address/pickup', data1, this.httpOption);
  }

  updateDeliveryLocation(data) {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post('https://apiv2.shiprocket.in/v1/external/orders/address/update', data, this.httpOption);
  }

  updateOrder(data) {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post('https://apiv2.shiprocket.in/v1/external/orders/update/adhoc', data, this.httpOption);
  }
  cancelOrder(data?) {
    let data1: any;
    data1 = {
      ids: [data]
    };
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
     
    return this.http.post("https://apiv2.shiprocket.in/v1/external/orders/cancel", data1, this.httpOption);
  }
  generateInvoice(idArr) {
    let data = {
      ids: idArr
    }
     
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post("https://apiv2.shiprocket.in/v1/external/orders/print/invoice", data, this.httpOption)
  }
  //for orders
  getAllOrderfromShiprocket() {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
     
    return this.http.get("https://apiv2.shiprocket.in/v1/external/orders", this.httpOption);
  }
  getOrderDeialsfromShiprocket(id) {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
     
    return this.http.get("https://apiv2.shiprocket.in/v1/external/orders/show/" + id, this.httpOption);
  }
  exportOrders() {

    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
     
    return this.http.post("https://apiv2.shiprocket.in/v1/external/orders/export", this.httpOption);
  }
  //to get details about courier service
  getCourierServiceability(order) {
     
    let data={
      "order_id":order.id,
      "pickup_postcode":order.pickup_address_detail.pin_code,
      "delivery_postcode":order.customer_pincode,
      "cod":1
    }
    //Use this API to check the availability of couriers between the pickup and delivery postal codes. Further details like the estimated time of delivery, the rates along with the ids are also shown.
    //One of either the 'order_id' or 'cod' and 'weight' is required. If you specify the order id, the cod and weight fields are not required and vice versa.
    //You can add further fields to add the shipment details and filter the search.
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.get("https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode="+data.pickup_postcode+"&delivety_postcode="+data.delivery_postcode+"&order_id="+data.order_id,this.httpOption);
  }


  //to get all pickup addresses

  getAllPickupAddresses() {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.get("https://apiv2.shiprocket.in/v1/external/settings/company/pickup", this.httpOption);
  }

  AddNewPickupAddress(data) {
    /*  
      "pickup_location": "Home", **required
      "name": "Deadpool", **required
      "email": "deadpool@chimichanga.com", **required
      "phone": "9777777779", **required
      "address": "Mutant Facility, Sector 3 ", **required
      "address_2": "", 
      "city": "Pune", **required
      "state":"Maharshtra", **required
      "country": "India", **required
      "pin_code": "110022" **required
      
    */
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post("https://apiv2.shiprocket.in/v1/external/settings/company/addpickup", data, this.httpOption);
  }


  //Tracking

  getTrackingusingAWB(awbCode) {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.get('https://apiv2.shiprocket.in/v1/external/courier/track/awb/' + awbCode + '/', this.httpOption);
  }
  getTrackingusingMultiAWB(data) {
    let data1 = {
      awbs: data
    }
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.post('https://apiv2.shiprocket.in/v1/external/courier/track/awbs', data1, this.httpOption);
  }

  getTrackingusingShipId(shipId) {
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.get('https://apiv2.shiprocket.in/v1/external/courier/track/awb/' + shipId, this.httpOption);
  }

  getTrackingusingOrderId(orderId) {
    let data = {
      order_id: orderId
    }
    this.httpOption.headers = new HttpHeaders({ "Authorization": 'Bearer ' + localStorage.getItem('shipToken') });
    return this.http.get('https://apiv2.shiprocket.in/v1/external/courier/track' + data, this.httpOption);
  }



}