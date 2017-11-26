/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndPaginationDetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-detail.component';
import { EntityWithServiceClassAndPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.service';
import { EntityWithServiceClassAndPagination } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndPagination Management Detail Component', () => {
        let comp: EntityWithServiceClassAndPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndPaginationDetailComponent>;
        let service: EntityWithServiceClassAndPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndPaginationDetailComponent],
                providers: [
                    EntityWithServiceClassAndPaginationService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndPaginationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceClassAndPagination(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceClassAndPagination).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
