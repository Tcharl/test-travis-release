/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationDetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination-detail.component';
import { EntityWithPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.service';
import { EntityWithPagination } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithPagination Management Detail Component', () => {
        let comp: EntityWithPaginationDetailComponent;
        let fixture: ComponentFixture<EntityWithPaginationDetailComponent>;
        let service: EntityWithPaginationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationDetailComponent],
                providers: [
                    EntityWithPaginationService
                ]
            })
            .overrideTemplate(EntityWithPaginationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithPagination(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithPagination).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
