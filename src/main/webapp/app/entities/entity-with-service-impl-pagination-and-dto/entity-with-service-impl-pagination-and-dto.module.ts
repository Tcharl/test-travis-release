import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceImplPaginationAndDTOService,
    EntityWithServiceImplPaginationAndDTOPopupService,
    EntityWithServiceImplPaginationAndDTOComponent,
    EntityWithServiceImplPaginationAndDTODetailComponent,
    EntityWithServiceImplPaginationAndDTODialogComponent,
    EntityWithServiceImplPaginationAndDTOPopupComponent,
    EntityWithServiceImplPaginationAndDTODeletePopupComponent,
    EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
    entityWithServiceImplPaginationAndDTORoute,
    entityWithServiceImplPaginationAndDTOPopupRoute,
    EntityWithServiceImplPaginationAndDTOResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceImplPaginationAndDTORoute,
    ...entityWithServiceImplPaginationAndDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceImplPaginationAndDTOComponent,
        EntityWithServiceImplPaginationAndDTODetailComponent,
        EntityWithServiceImplPaginationAndDTODialogComponent,
        EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
        EntityWithServiceImplPaginationAndDTOPopupComponent,
        EntityWithServiceImplPaginationAndDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceImplPaginationAndDTOComponent,
        EntityWithServiceImplPaginationAndDTODialogComponent,
        EntityWithServiceImplPaginationAndDTOPopupComponent,
        EntityWithServiceImplPaginationAndDTODeleteDialogComponent,
        EntityWithServiceImplPaginationAndDTODeletePopupComponent,
    ],
    providers: [
        EntityWithServiceImplPaginationAndDTOService,
        EntityWithServiceImplPaginationAndDTOPopupService,
        EntityWithServiceImplPaginationAndDTOResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceImplPaginationAndDTOModule {}
