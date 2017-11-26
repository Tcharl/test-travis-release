import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    EntityWithServiceImplService,
    EntityWithServiceImplPopupService,
    EntityWithServiceImplComponent,
    EntityWithServiceImplDetailComponent,
    EntityWithServiceImplDialogComponent,
    EntityWithServiceImplPopupComponent,
    EntityWithServiceImplDeletePopupComponent,
    EntityWithServiceImplDeleteDialogComponent,
    entityWithServiceImplRoute,
    entityWithServiceImplPopupRoute,
} from './';

const ENTITY_STATES = [
    ...entityWithServiceImplRoute,
    ...entityWithServiceImplPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EntityWithServiceImplComponent,
        EntityWithServiceImplDetailComponent,
        EntityWithServiceImplDialogComponent,
        EntityWithServiceImplDeleteDialogComponent,
        EntityWithServiceImplPopupComponent,
        EntityWithServiceImplDeletePopupComponent,
    ],
    entryComponents: [
        EntityWithServiceImplComponent,
        EntityWithServiceImplDialogComponent,
        EntityWithServiceImplPopupComponent,
        EntityWithServiceImplDeleteDialogComponent,
        EntityWithServiceImplDeletePopupComponent,
    ],
    providers: [
        EntityWithServiceImplService,
        EntityWithServiceImplPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityWithServiceImplModule {}
