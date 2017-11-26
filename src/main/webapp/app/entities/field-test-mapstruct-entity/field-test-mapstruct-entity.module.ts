import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestMapstructEntityService,
    FieldTestMapstructEntityPopupService,
    FieldTestMapstructEntityComponent,
    FieldTestMapstructEntityDetailComponent,
    FieldTestMapstructEntityDialogComponent,
    FieldTestMapstructEntityPopupComponent,
    FieldTestMapstructEntityDeletePopupComponent,
    FieldTestMapstructEntityDeleteDialogComponent,
    fieldTestMapstructEntityRoute,
    fieldTestMapstructEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fieldTestMapstructEntityRoute,
    ...fieldTestMapstructEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestMapstructEntityComponent,
        FieldTestMapstructEntityDetailComponent,
        FieldTestMapstructEntityDialogComponent,
        FieldTestMapstructEntityDeleteDialogComponent,
        FieldTestMapstructEntityPopupComponent,
        FieldTestMapstructEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestMapstructEntityComponent,
        FieldTestMapstructEntityDialogComponent,
        FieldTestMapstructEntityPopupComponent,
        FieldTestMapstructEntityDeleteDialogComponent,
        FieldTestMapstructEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestMapstructEntityService,
        FieldTestMapstructEntityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestMapstructEntityModule {}
