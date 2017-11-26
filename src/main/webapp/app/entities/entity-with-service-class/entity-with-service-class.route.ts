import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EntityWithServiceClassComponent } from './entity-with-service-class.component';
import { EntityWithServiceClassDetailComponent } from './entity-with-service-class-detail.component';
import { EntityWithServiceClassPopupComponent } from './entity-with-service-class-dialog.component';
import { EntityWithServiceClassDeletePopupComponent } from './entity-with-service-class-delete-dialog.component';

export const entityWithServiceClassRoute: Routes = [
    {
        path: 'entity-with-service-class',
        component: EntityWithServiceClassComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entity-with-service-class/:id',
        component: EntityWithServiceClassDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClass.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassPopupRoute: Routes = [
    {
        path: 'entity-with-service-class-new',
        component: EntityWithServiceClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-class/:id/edit',
        component: EntityWithServiceClassPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-class/:id/delete',
        component: EntityWithServiceClassDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClass.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
