import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestServiceClassEntityService,
    FieldTestServiceClassEntityPopupService,
    FieldTestServiceClassEntityComponent,
    FieldTestServiceClassEntityDetailComponent,
    FieldTestServiceClassEntityDialogComponent,
    FieldTestServiceClassEntityPopupComponent,
    FieldTestServiceClassEntityDeletePopupComponent,
    FieldTestServiceClassEntityDeleteDialogComponent,
    fieldTestServiceClassEntityRoute,
    fieldTestServiceClassEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fieldTestServiceClassEntityRoute,
    ...fieldTestServiceClassEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestServiceClassEntityComponent,
        FieldTestServiceClassEntityDetailComponent,
        FieldTestServiceClassEntityDialogComponent,
        FieldTestServiceClassEntityDeleteDialogComponent,
        FieldTestServiceClassEntityPopupComponent,
        FieldTestServiceClassEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestServiceClassEntityComponent,
        FieldTestServiceClassEntityDialogComponent,
        FieldTestServiceClassEntityPopupComponent,
        FieldTestServiceClassEntityDeleteDialogComponent,
        FieldTestServiceClassEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestServiceClassEntityService,
        FieldTestServiceClassEntityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestServiceClassEntityModule {}
