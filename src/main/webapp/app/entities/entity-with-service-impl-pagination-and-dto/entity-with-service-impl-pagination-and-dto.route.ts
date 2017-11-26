import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EntityWithServiceImplPaginationAndDTOComponent } from './entity-with-service-impl-pagination-and-dto.component';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from './entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTOPopupComponent } from './entity-with-service-impl-pagination-and-dto-dialog.component';
import {
    EntityWithServiceImplPaginationAndDTODeletePopupComponent
} from './entity-with-service-impl-pagination-and-dto-delete-dialog.component';

@Injectable()
export class EntityWithServiceImplPaginationAndDTOResolvePagingParams implements Resolve<any> {

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

export const entityWithServiceImplPaginationAndDTORoute: Routes = [
    {
        path: 'entity-with-service-impl-pagination-and-dto',
        component: EntityWithServiceImplPaginationAndDTOComponent,
        resolve: {
            'pagingParams': EntityWithServiceImplPaginationAndDTOResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceImplPaginationAndDTO.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entity-with-service-impl-pagination-and-dto/:id',
        component: EntityWithServiceImplPaginationAndDTODetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceImplPaginationAndDTO.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entityWithServiceImplPaginationAndDTOPopupRoute: Routes = [
    {
        path: 'entity-with-service-impl-pagination-and-dto-new',
        component: EntityWithServiceImplPaginationAndDTOPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceImplPaginationAndDTO.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-impl-pagination-and-dto/:id/edit',
        component: EntityWithServiceImplPaginationAndDTOPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceImplPaginationAndDTO.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entity-with-service-impl-pagination-and-dto/:id/delete',
        component: EntityWithServiceImplPaginationAndDTODeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationApp.entityWithServiceImplPaginationAndDTO.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
