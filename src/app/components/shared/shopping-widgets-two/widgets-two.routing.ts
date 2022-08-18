import { Routes } from '@angular/router';
import { ShoppingWidgetsTwoComponent } from './shopping-widgets-two.component';


export const WidgestTwoRoutes: Routes = [{
    path: '',
    children: [{
        path: 'widget-two',
        component: ShoppingWidgetsTwoComponent
    }]
}];