/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndPaginationDetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination-detail.component';
import { EntityWithServiceImplAndPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.service';
import { EntityWithServiceImplAndPagination } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndPagination Management Detail Component', () => {
        let comp: EntityWithServiceImplAndPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndPaginationDetailComponent>;
        let service: EntityWithServiceImplAndPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndPaginationDetailComponent],
                providers: [
                    EntityWithServiceImplAndPaginationService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndPaginationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceImplAndPagination(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceImplAndPagination).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
