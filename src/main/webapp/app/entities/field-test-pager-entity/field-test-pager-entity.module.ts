import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestPagerEntityService,
    FieldTestPagerEntityPopupService,
    FieldTestPagerEntityComponent,
    FieldTestPagerEntityDetailComponent,
    FieldTestPagerEntityDialogComponent,
    FieldTestPagerEntityPopupComponent,
    FieldTestPagerEntityDeletePopupComponent,
    FieldTestPagerEntityDeleteDialogComponent,
    fieldTestPagerEntityRoute,
    fieldTestPagerEntityPopupRoute,
    FieldTestPagerEntityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fieldTestPagerEntityRoute,
    ...fieldTestPagerEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestPagerEntityComponent,
        FieldTestPagerEntityDetailComponent,
        FieldTestPagerEntityDialogComponent,
        FieldTestPagerEntityDeleteDialogComponent,
        FieldTestPagerEntityPopupComponent,
        FieldTestPagerEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestPagerEntityComponent,
        FieldTestPagerEntityDialogComponent,
        FieldTestPagerEntityPopupComponent,
        FieldTestPagerEntityDeleteDialogComponent,
        FieldTestPagerEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestPagerEntityService,
        FieldTestPagerEntityPopupService,
        FieldTestPagerEntityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestPagerEntityModule {}
