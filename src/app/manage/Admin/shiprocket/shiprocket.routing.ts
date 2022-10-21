import { Routes } from "@angular/router";
import { CourierPartnersComponent } from "./courier-partners/courier-partners.component";
import { ShipOrdersComponent } from "./ship-orders/ship-orders.component";



export const ShiprocketRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'orders',
            component: ShipOrdersComponent
        }]
    },
    {
        path: '',
        children: [{
            path: 'courier',
            component: CourierPartnersComponent
        }]
    },

];
