/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndPaginationComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.component';
import { EntityWithServiceImplAndPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.service';
import { EntityWithServiceImplAndPagination } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-pagination/entity-with-service-impl-and-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndPagination Management Component', () => {
        let comp: EntityWithServiceImplAndPaginationComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndPaginationComponent>;
        let service: EntityWithServiceImplAndPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndPaginationComponent],
                providers: [
                    EntityWithServiceImplAndPaginationService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndPaginationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndPaginationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceImplAndPagination(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceImplAndPaginations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
