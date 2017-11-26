import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithPaginationAndDTOService,
    EntityWithPaginationAndDTOPopupService,
    EntityWithPaginationAndDTOComponent,
    EntityWithPaginationAndDTODetailComponent,
    EntityWithPaginationAndDTODialogComponent,
    EntityWithPaginationAndDTOPopupComponent,
    EntityWithPaginationAndDTODeletePopupComponent,
    EntityWithPaginationAndDTODeleteDialogComponent,
    entityWithPaginationAndDTORoute,
    entityWithPaginationAndDTOPopupRoute,
    EntityWithPaginationAndDTOResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithPaginationAndDTORoute,
    ...entityWithPaginationAndDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithPaginationAndDTOComponent,
        EntityWithPaginationAndDTODetailComponent,
        EntityWithPaginationAndDTODialogComponent,
        EntityWithPaginationAndDTODeleteDialogComponent,
        EntityWithPaginationAndDTOPopupComponent,
        EntityWithPaginationAndDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithPaginationAndDTOComponent,
        EntityWithPaginationAndDTODialogComponent,
        EntityWithPaginationAndDTOPopupComponent,
        EntityWithPaginationAndDTODeleteDialogComponent,
        EntityWithPaginationAndDTODeletePopupComponent,
    ],
    providers: [
        EntityWithPaginationAndDTOService,
        EntityWithPaginationAndDTOPopupService,
        EntityWithPaginationAndDTOResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithPaginationAndDTOModule {}
