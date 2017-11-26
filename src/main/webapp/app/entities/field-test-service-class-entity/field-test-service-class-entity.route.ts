import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FieldTestServiceClassEntityComponent } from './field-test-service-class-entity.component';
import { FieldTestServiceClassEntityDetailComponent } from './field-test-service-class-entity-detail.component';
import { FieldTestServiceClassEntityPopupComponent } from './field-test-service-class-entity-dialog.component';
import {
    FieldTestServiceClassEntityDeletePopupComponent
} from './field-test-service-class-entity-delete-dialog.component';

export const fieldTestServiceClassEntityRoute: Routes = [
    {
        path: 'field-test-service-class-entity',
        component: FieldTestServiceClassEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestServiceClassEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'field-test-service-class-entity/:id',
        component: FieldTestServiceClassEntityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestServiceClassEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestServiceClassEntityPopupRoute: Routes = [
    {
        path: 'field-test-service-class-entity-new',
        component: FieldTestServiceClassEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestServiceClassEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'field-test-service-class-entity/:id/edit',
        component: FieldTestServiceClassEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestServiceClassEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'field-test-service-class-entity/:id/delete',
        component: FieldTestServiceClassEntityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestServiceClassEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
