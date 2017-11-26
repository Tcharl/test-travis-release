import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceClassAndDTOService,
    EntityWithServiceClassAndDTOPopupService,
    EntityWithServiceClassAndDTOComponent,
    EntityWithServiceClassAndDTODetailComponent,
    EntityWithServiceClassAndDTODialogComponent,
    EntityWithServiceClassAndDTOPopupComponent,
    EntityWithServiceClassAndDTODeletePopupComponent,
    EntityWithServiceClassAndDTODeleteDialogComponent,
    entityWithServiceClassAndDTORoute,
    entityWithServiceClassAndDTOPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceClassAndDTORoute,
    ...entityWithServiceClassAndDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceClassAndDTOComponent,
        EntityWithServiceClassAndDTODetailComponent,
        EntityWithServiceClassAndDTODialogComponent,
        EntityWithServiceClassAndDTODeleteDialogComponent,
        EntityWithServiceClassAndDTOPopupComponent,
        EntityWithServiceClassAndDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceClassAndDTOComponent,
        EntityWithServiceClassAndDTODialogComponent,
        EntityWithServiceClassAndDTOPopupComponent,
        EntityWithServiceClassAndDTODeleteDialogComponent,
        EntityWithServiceClassAndDTODeletePopupComponent,
    ],
    providers: [
        EntityWithServiceClassAndDTOService,
        EntityWithServiceClassAndDTOPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceClassAndDTOModule {}
