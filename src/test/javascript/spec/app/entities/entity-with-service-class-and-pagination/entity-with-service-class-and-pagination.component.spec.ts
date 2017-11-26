/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndPaginationComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.component';
import { EntityWithServiceClassAndPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.service';
import { EntityWithServiceClassAndPagination } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndPagination Management Component', () => {
        let comp: EntityWithServiceClassAndPaginationComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndPaginationComponent>;
        let service: EntityWithServiceClassAndPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndPaginationComponent],
                providers: [
                    EntityWithServiceClassAndPaginationService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndPaginationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceClassAndPagination(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceClassAndPaginations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
