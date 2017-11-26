/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.component';
import { EntityWithPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.service';
import { EntityWithPagination } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithPagination Management Component', () => {
        let comp: EntityWithPaginationComponent;
        let fixture: ComponentFixture<EntityWithPaginationComponent>;
        let service: EntityWithPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationComponent],
                providers: [
                    EntityWithPaginationService
                ]
            })
            .overrideTemplate(EntityWithPaginationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithPagination(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithPaginations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
