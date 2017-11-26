import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestInfiniteScrollEntityService,
    FieldTestInfiniteScrollEntityPopupService,
    FieldTestInfiniteScrollEntityComponent,
    FieldTestInfiniteScrollEntityDetailComponent,
    FieldTestInfiniteScrollEntityDialogComponent,
    FieldTestInfiniteScrollEntityPopupComponent,
    FieldTestInfiniteScrollEntityDeletePopupComponent,
    FieldTestInfiniteScrollEntityDeleteDialogComponent,
    fieldTestInfiniteScrollEntityRoute,
    fieldTestInfiniteScrollEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fieldTestInfiniteScrollEntityRoute,
    ...fieldTestInfiniteScrollEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestInfiniteScrollEntityComponent,
        FieldTestInfiniteScrollEntityDetailComponent,
        FieldTestInfiniteScrollEntityDialogComponent,
        FieldTestInfiniteScrollEntityDeleteDialogComponent,
        FieldTestInfiniteScrollEntityPopupComponent,
        FieldTestInfiniteScrollEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestInfiniteScrollEntityComponent,
        FieldTestInfiniteScrollEntityDialogComponent,
        FieldTestInfiniteScrollEntityPopupComponent,
        FieldTestInfiniteScrollEntityDeleteDialogComponent,
        FieldTestInfiniteScrollEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestInfiniteScrollEntityService,
        FieldTestInfiniteScrollEntityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestInfiniteScrollEntityModule {}
