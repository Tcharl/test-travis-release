import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceClassPaginationAndDTOService,
    EntityWithServiceClassPaginationAndDTOPopupService,
    EntityWithServiceClassPaginationAndDTOComponent,
    EntityWithServiceClassPaginationAndDTODetailComponent,
    EntityWithServiceClassPaginationAndDTODialogComponent,
    EntityWithServiceClassPaginationAndDTOPopupComponent,
    EntityWithServiceClassPaginationAndDTODeletePopupComponent,
    EntityWithServiceClassPaginationAndDTODeleteDialogComponent,
    entityWithServiceClassPaginationAndDTORoute,
    entityWithServiceClassPaginationAndDTOPopupRoute,
    EntityWithServiceClassPaginationAndDTOResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceClassPaginationAndDTORoute,
    ...entityWithServiceClassPaginationAndDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceClassPaginationAndDTOComponent,
        EntityWithServiceClassPaginationAndDTODetailComponent,
        EntityWithServiceClassPaginationAndDTODialogComponent,
        EntityWithServiceClassPaginationAndDTODeleteDialogComponent,
        EntityWithServiceClassPaginationAndDTOPopupComponent,
        EntityWithServiceClassPaginationAndDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceClassPaginationAndDTOComponent,
        EntityWithServiceClassPaginationAndDTODialogComponent,
        EntityWithServiceClassPaginationAndDTOPopupComponent,
        EntityWithServiceClassPaginationAndDTODeleteDialogComponent,
        EntityWithServiceClassPaginationAndDTODeletePopupComponent,
    ],
    providers: [
        EntityWithServiceClassPaginationAndDTOService,
        EntityWithServiceClassPaginationAndDTOPopupService,
        EntityWithServiceClassPaginationAndDTOResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceClassPaginationAndDTOModule {}
