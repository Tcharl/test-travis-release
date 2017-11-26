import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EntityWithServiceClassAndPaginationComponent } from './entity-with-service-class-and-pagination.component';
import { EntityWithServiceClassAndPaginationDetailComponent } from './entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPaginationPopupComponent } from './entity-with-service-class-and-pagination-dialog.component';
import {
    EntityWithServiceClassAndPaginationDeletePopupComponent
} from './entity-with-service-class-and-pagination-delete-dialog.component';

@Injectable()
export class EntityWithServiceClassAndPaginationResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const entityWithServiceClassAndPaginationRoute: Routes = [
    {
        path: 'entity-with-service-class-and-pagination',
        component: EntityWithServiceClassAndPaginationComponent,
        resolve: {
            'pagingParams': EntityWithServiceClassAndPaginationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClassAndPagination.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entity-with-service-class-and-pagination/:id',
        component: EntityWithServiceClassAndPaginationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClassAndPagination.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceClassAndPaginationPopupRoute: Routes = [
    {
        path: 'entity-with-service-class-and-pagination-new',
        component: EntityWithServiceClassAndPaginationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClassAndPagination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-class-and-pagination/:id/edit',
        component: EntityWithServiceClassAndPaginationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClassAndPagination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-class-and-pagination/:id/delete',
        component: EntityWithServiceClassAndPaginationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceClassAndPagination.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
