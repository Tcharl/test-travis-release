import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceImplAndPaginationService,
    EntityWithServiceImplAndPaginationPopupService,
    EntityWithServiceImplAndPaginationComponent,
    EntityWithServiceImplAndPaginationDetailComponent,
    EntityWithServiceImplAndPaginationDialogComponent,
    EntityWithServiceImplAndPaginationPopupComponent,
    EntityWithServiceImplAndPaginationDeletePopupComponent,
    EntityWithServiceImplAndPaginationDeleteDialogComponent,
    entityWithServiceImplAndPaginationRoute,
    entityWithServiceImplAndPaginationPopupRoute,
    EntityWithServiceImplAndPaginationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceImplAndPaginationRoute,
    ...entityWithServiceImplAndPaginationPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceImplAndPaginationComponent,
        EntityWithServiceImplAndPaginationDetailComponent,
        EntityWithServiceImplAndPaginationDialogComponent,
        EntityWithServiceImplAndPaginationDeleteDialogComponent,
        EntityWithServiceImplAndPaginationPopupComponent,
        EntityWithServiceImplAndPaginationDeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceImplAndPaginationComponent,
        EntityWithServiceImplAndPaginationDialogComponent,
        EntityWithServiceImplAndPaginationPopupComponent,
        EntityWithServiceImplAndPaginationDeleteDialogComponent,
        EntityWithServiceImplAndPaginationDeletePopupComponent,
    ],
    providers: [
        EntityWithServiceImplAndPaginationService,
        EntityWithServiceImplAndPaginationPopupService,
        EntityWithServiceImplAndPaginationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceImplAndPaginationModule {}
