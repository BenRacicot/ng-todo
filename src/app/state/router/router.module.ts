import { NgModule } from '@angular/core';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        StoreModule.forFeature('router', routerReducer),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        })
    ],
    exports: [
        StoreModule,
        StoreRouterConnectingModule
    ]
})
export class RouterStateModule { }
