import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceClassAndPaginationService,
    EntityWithServiceClassAndPaginationPopupService,
    EntityWithServiceClassAndPaginationComponent,
    EntityWithServiceClassAndPaginationDetailComponent,
    EntityWithServiceClassAndPaginationDialogComponent,
    EntityWithServiceClassAndPaginationPopupComponent,
    EntityWithServiceClassAndPaginationDeletePopupComponent,
    EntityWithServiceClassAndPaginationDeleteDialogComponent,
    entityWithServiceClassAndPaginationRoute,
    entityWithServiceClassAndPaginationPopupRoute,
    EntityWithServiceClassAndPaginationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceClassAndPaginationRoute,
    ...entityWithServiceClassAndPaginationPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceClassAndPaginationComponent,
        EntityWithServiceClassAndPaginationDetailComponent,
        EntityWithServiceClassAndPaginationDialogComponent,
        EntityWithServiceClassAndPaginationDeleteDialogComponent,
        EntityWithServiceClassAndPaginationPopupComponent,
        EntityWithServiceClassAndPaginationDeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceClassAndPaginationComponent,
        EntityWithServiceClassAndPaginationDialogComponent,
        EntityWithServiceClassAndPaginationPopupComponent,
        EntityWithServiceClassAndPaginationDeleteDialogComponent,
        EntityWithServiceClassAndPaginationDeletePopupComponent,
    ],
    providers: [
        EntityWithServiceClassAndPaginationService,
        EntityWithServiceClassAndPaginationPopupService,
        EntityWithServiceClassAndPaginationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceClassAndPaginationModule {}
