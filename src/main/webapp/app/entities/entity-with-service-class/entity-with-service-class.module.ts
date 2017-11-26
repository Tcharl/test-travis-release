import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceClassService,
    EntityWithServiceClassPopupService,
    EntityWithServiceClassComponent,
    EntityWithServiceClassDetailComponent,
    EntityWithServiceClassDialogComponent,
    EntityWithServiceClassPopupComponent,
    EntityWithServiceClassDeletePopupComponent,
    EntityWithServiceClassDeleteDialogComponent,
    entityWithServiceClassRoute,
    entityWithServiceClassPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceClassRoute,
    ...entityWithServiceClassPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceClassComponent,
        EntityWithServiceClassDetailComponent,
        EntityWithServiceClassDialogComponent,
        EntityWithServiceClassDeleteDialogComponent,
        EntityWithServiceClassPopupComponent,
        EntityWithServiceClassDeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceClassComponent,
        EntityWithServiceClassDialogComponent,
        EntityWithServiceClassPopupComponent,
        EntityWithServiceClassDeleteDialogComponent,
        EntityWithServiceClassDeletePopupComponent,
    ],
    providers: [
        EntityWithServiceClassService,
        EntityWithServiceClassPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceClassModule {}
