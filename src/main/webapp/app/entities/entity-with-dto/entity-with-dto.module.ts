import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithDTOService,
    EntityWithDTOPopupService,
    EntityWithDTOComponent,
    EntityWithDTODetailComponent,
    EntityWithDTODialogComponent,
    EntityWithDTOPopupComponent,
    EntityWithDTODeletePopupComponent,
    EntityWithDTODeleteDialogComponent,
    entityWithDTORoute,
    entityWithDTOPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entityWithDTORoute,
    ...entityWithDTOPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithDTOComponent,
        EntityWithDTODetailComponent,
        EntityWithDTODialogComponent,
        EntityWithDTODeleteDialogComponent,
        EntityWithDTOPopupComponent,
        EntityWithDTODeletePopupComponent,
    ],
    entryComponents: [
        EntityWithDTOComponent,
        EntityWithDTODialogComponent,
        EntityWithDTOPopupComponent,
        EntityWithDTODeleteDialogComponent,
        EntityWithDTODeletePopupComponent,
    ],
    providers: [
        EntityWithDTOService,
        EntityWithDTOPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithDTOModule {}
