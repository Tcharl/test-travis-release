import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationBankAccountModule } from './bank-account/bank-account.module';
import { JhipsterSampleApplicationLabelModule } from './label/label.module';
import { JhipsterSampleApplicationOperationModule } from './operation/operation.module';
import { JhipsterSampleApplicationFieldTestEntityModule } from './field-test-entity/field-test-entity.module';
import { JhipsterSampleApplicationFieldTestPagerEntityModule } from './field-test-pager-entity/field-test-pager-entity.module';
import { JhipsterSampleApplicationFieldTestMapstructEntityModule } from './field-test-mapstruct-entity/field-test-mapstruct-entity.module';
import { JhipsterSampleApplicationFieldTestServiceImplEntityModule } from './field-test-service-impl-entity/field-test-service-impl-entity.module';
import { JhipsterSampleApplicationFieldTestInfiniteScrollEntityModule } from './field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.module';
import { JhipsterSampleApplicationFieldTestServiceClassEntityModule } from './field-test-service-class-entity/field-test-service-class-entity.module';
import { JhipsterSampleApplicationFieldTestPaginationEntityModule } from './field-test-pagination-entity/field-test-pagination-entity.module';
import { JhipsterSampleApplicationEntityWithDTOModule } from './entity-with-dto/entity-with-dto.module';
import { JhipsterSampleApplicationEntityWithServiceClassModule } from './entity-with-service-class/entity-with-service-class.module';
import { JhipsterSampleApplicationEntityWithServiceImplModule } from './entity-with-service-impl/entity-with-service-impl.module';
import { JhipsterSampleApplicationEntityWithPaginationModule } from './entity-with-pagination/entity-with-pagination.module';
import { JhipsterSampleApplicationEntityWithServiceClassAndPaginationModule } from './entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.module';
import { JhipsterSampleApplicationEntityWithServiceImplAndPaginationModule } from './entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.module';
import { JhipsterSampleApplicationEntityWithServiceClassAndDTOModule } from './entity-with-service-class-and-dto/entity-with-service-class-and-dto.module';
import { JhipsterSampleApplicationEntityWithServiceImplAndDTOModule } from './entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.module';
import { JhipsterSampleApplicationEntityWithPaginationAndDTOModule } from './entity-with-pagination-and-dto/entity-with-pagination-and-dto.module';
import {
    JhipsterSampleApplicationEntityWithServiceClassPaginationAndDTOModule
} from './entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.module';
import {
    JhipsterSampleApplicationEntityWithServiceImplPaginationAndDTOModule
} from './entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationBankAccountModule,
        JhipsterSampleApplicationLabelModule,
        JhipsterSampleApplicationOperationModule,
        JhipsterSampleApplicationFieldTestEntityModule,
        JhipsterSampleApplicationFieldTestPagerEntityModule,
        JhipsterSampleApplicationFieldTestMapstructEntityModule,
        JhipsterSampleApplicationFieldTestServiceImplEntityModule,
        JhipsterSampleApplicationFieldTestInfiniteScrollEntityModule,
        JhipsterSampleApplicationFieldTestServiceClassEntityModule,
        JhipsterSampleApplicationFieldTestPaginationEntityModule,
        JhipsterSampleApplicationEntityWithDTOModule,
        JhipsterSampleApplicationEntityWithServiceClassModule,
        JhipsterSampleApplicationEntityWithServiceImplModule,
        JhipsterSampleApplicationEntityWithPaginationModule,
        JhipsterSampleApplicationEntityWithServiceClassAndPaginationModule,
        JhipsterSampleApplicationEntityWithServiceImplAndPaginationModule,
        JhipsterSampleApplicationEntityWithServiceClassAndDTOModule,
        JhipsterSampleApplicationEntityWithServiceImplAndDTOModule,
        JhipsterSampleApplicationEntityWithPaginationAndDTOModule,
        JhipsterSampleApplicationEntityWithServiceClassPaginationAndDTOModule,
        JhipsterSampleApplicationEntityWithServiceImplPaginationAndDTOModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
