import { Routes } from "@angular/router";
import { ShipOrdersComponent } from "./ship-orders/ship-orders.component";



export const ShiprocketRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'orders',
            component: ShipOrdersComponent
        }]
    },
    // {
    //     path: '',
    //     children: [{
    //         path: 'webhome',
    //         component: WebhomeComponent
    //     }]
    // },

];
