import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FieldTestInfiniteScrollEntityComponent } from './field-test-infinite-scroll-entity.component';
import { FieldTestInfiniteScrollEntityDetailComponent } from './field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntityPopupComponent } from './field-test-infinite-scroll-entity-dialog.component';
import {
    FieldTestInfiniteScrollEntityDeletePopupComponent
} from './field-test-infinite-scroll-entity-delete-dialog.component';

export const fieldTestInfiniteScrollEntityRoute: Routes = [
    {
        path: 'field-test-infinite-scroll-entity',
        component: FieldTestInfiniteScrollEntityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestInfiniteScrollEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'field-test-infinite-scroll-entity/:id',
        component: FieldTestInfiniteScrollEntityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestInfiniteScrollEntity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldTestInfiniteScrollEntityPopupRoute: Routes = [
    {
        path: 'field-test-infinite-scroll-entity-new',
        component: FieldTestInfiniteScrollEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestInfiniteScrollEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'field-test-infinite-scroll-entity/:id/edit',
        component: FieldTestInfiniteScrollEntityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestInfiniteScrollEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'field-test-infinite-scroll-entity/:id/delete',
        component: FieldTestInfiniteScrollEntityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.fieldTestInfiniteScrollEntity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
