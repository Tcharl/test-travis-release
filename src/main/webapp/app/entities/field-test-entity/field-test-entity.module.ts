import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestEntityService,
    FieldTestEntityPopupService,
    FieldTestEntityComponent,
    FieldTestEntityDetailComponent,
    FieldTestEntityDialogComponent,
    FieldTestEntityPopupComponent,
    FieldTestEntityDeletePopupComponent,
    FieldTestEntityDeleteDialogComponent,
    fieldTestEntityRoute,
    fieldTestEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fieldTestEntityRoute,
    ...fieldTestEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestEntityComponent,
        FieldTestEntityDetailComponent,
        FieldTestEntityDialogComponent,
        FieldTestEntityDeleteDialogComponent,
        FieldTestEntityPopupComponent,
        FieldTestEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestEntityComponent,
        FieldTestEntityDialogComponent,
        FieldTestEntityPopupComponent,
        FieldTestEntityDeleteDialogComponent,
        FieldTestEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestEntityService,
        FieldTestEntityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestEntityModule {}
