import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceImplAndDTOService,
    EntityWithServiceImplAndDTOPopupService,
    EntityWithServiceImplAndDTOComponent,
    EntityWithServiceImplAndDTODetailComponent,
    EntityWithServiceImplAndDTODialogComponent,
    EntityWithServiceImplAndDTOPopupComponent,
    EntityWithServiceImplAndDTODeletePopupComponent,
    EntityWithServiceImplAndDTODeleteDialogComponent,
    entityWithServiceImplAndDTORoute,
    entityWithServiceImplAndDTOPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceImplAndDTORoute,
    ...entityWithServiceImplAndDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceImplAndDTOComponent,
        EntityWithServiceImplAndDTODetailComponent,
        EntityWithServiceImplAndDTODialogComponent,
        EntityWithServiceImplAndDTODeleteDialogComponent,
        EntityWithServiceImplAndDTOPopupComponent,
        EntityWithServiceImplAndDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceImplAndDTOComponent,
        EntityWithServiceImplAndDTODialogComponent,
        EntityWithServiceImplAndDTOPopupComponent,
        EntityWithServiceImplAndDTODeleteDialogComponent,
        EntityWithServiceImplAndDTODeletePopupComponent,
    ],
    providers: [
        EntityWithServiceImplAndDTOService,
        EntityWithServiceImplAndDTOPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceImplAndDTOModule {}
