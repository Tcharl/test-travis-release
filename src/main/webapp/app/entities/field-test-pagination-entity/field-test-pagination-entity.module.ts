import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestPaginationEntityService,
    FieldTestPaginationEntityPopupService,
    FieldTestPaginationEntityComponent,
    FieldTestPaginationEntityDetailComponent,
    FieldTestPaginationEntityDialogComponent,
    FieldTestPaginationEntityPopupComponent,
    FieldTestPaginationEntityDeletePopupComponent,
    FieldTestPaginationEntityDeleteDialogComponent,
    fieldTestPaginationEntityRoute,
    fieldTestPaginationEntityPopupRoute,
    FieldTestPaginationEntityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fieldTestPaginationEntityRoute,
    ...fieldTestPaginationEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestPaginationEntityComponent,
        FieldTestPaginationEntityDetailComponent,
        FieldTestPaginationEntityDialogComponent,
        FieldTestPaginationEntityDeleteDialogComponent,
        FieldTestPaginationEntityPopupComponent,
        FieldTestPaginationEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestPaginationEntityComponent,
        FieldTestPaginationEntityDialogComponent,
        FieldTestPaginationEntityPopupComponent,
        FieldTestPaginationEntityDeleteDialogComponent,
        FieldTestPaginationEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestPaginationEntityService,
        FieldTestPaginationEntityPopupService,
        FieldTestPaginationEntityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestPaginationEntityModule {}
