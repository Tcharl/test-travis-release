/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassPaginationAndDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto-detail.component';
import { EntityWithServiceClassPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.service';
import { EntityWithServiceClassPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceClassPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTODetailComponent>;
        let service: EntityWithServiceClassPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassPaginationAndDTODetailComponent],
                providers: [
                    EntityWithServiceClassPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassPaginationAndDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceClassPaginationAndDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceClassPaginationAndDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
