import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithPaginationService,
    EntityWithPaginationPopupService,
    EntityWithPaginationComponent,
    EntityWithPaginationDetailComponent,
    EntityWithPaginationDialogComponent,
    EntityWithPaginationPopupComponent,
    EntityWithPaginationDeletePopupComponent,
    EntityWithPaginationDeleteDialogComponent,
    entityWithPaginationRoute,
    entityWithPaginationPopupRoute,
    EntityWithPaginationResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...entityWithPaginationRoute,
    ...entityWithPaginationPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithPaginationComponent,
        EntityWithPaginationDetailComponent,
        EntityWithPaginationDialogComponent,
        EntityWithPaginationDeleteDialogComponent,
        EntityWithPaginationPopupComponent,
        EntityWithPaginationDeletePopupComponent,
    ],
    entryComponents: [
        EntityWithPaginationComponent,
        EntityWithPaginationDialogComponent,
        EntityWithPaginationPopupComponent,
        EntityWithPaginationDeleteDialogComponent,
        EntityWithPaginationDeletePopupComponent,
    ],
    providers: [
        EntityWithPaginationService,
        EntityWithPaginationPopupService,
        EntityWithPaginationResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithPaginationModule {}
