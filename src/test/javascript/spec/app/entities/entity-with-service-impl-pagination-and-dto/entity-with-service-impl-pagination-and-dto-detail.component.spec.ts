/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplPaginationAndDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-detail.component';
import { EntityWithServiceImplPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.service';
import { EntityWithServiceImplPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceImplPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTODetailComponent>;
        let service: EntityWithServiceImplPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplPaginationAndDTODetailComponent],
                providers: [
                    EntityWithServiceImplPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplPaginationAndDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceImplPaginationAndDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceImplPaginationAndDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
