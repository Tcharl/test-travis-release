import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from '../../shared';
import {
    FieldTestServiceImplEntityService,
    FieldTestServiceImplEntityPopupService,
    FieldTestServiceImplEntityComponent,
    FieldTestServiceImplEntityDetailComponent,
    FieldTestServiceImplEntityDialogComponent,
    FieldTestServiceImplEntityPopupComponent,
    FieldTestServiceImplEntityDeletePopupComponent,
    FieldTestServiceImplEntityDeleteDialogComponent,
    fieldTestServiceImplEntityRoute,
    fieldTestServiceImplEntityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fieldTestServiceImplEntityRoute,
    ...fieldTestServiceImplEntityPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldTestServiceImplEntityComponent,
        FieldTestServiceImplEntityDetailComponent,
        FieldTestServiceImplEntityDialogComponent,
        FieldTestServiceImplEntityDeleteDialogComponent,
        FieldTestServiceImplEntityPopupComponent,
        FieldTestServiceImplEntityDeletePopupComponent,
    ],
    entryComponents: [
        FieldTestServiceImplEntityComponent,
        FieldTestServiceImplEntityDialogComponent,
        FieldTestServiceImplEntityPopupComponent,
        FieldTestServiceImplEntityDeleteDialogComponent,
        FieldTestServiceImplEntityDeletePopupComponent,
    ],
    providers: [
        FieldTestServiceImplEntityService,
        FieldTestServiceImplEntityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationFieldTestServiceImplEntityModule {}
