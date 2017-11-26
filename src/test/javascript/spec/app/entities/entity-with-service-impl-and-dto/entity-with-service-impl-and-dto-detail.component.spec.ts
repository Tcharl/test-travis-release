/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-detail.component';
import { EntityWithServiceImplAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceImplAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTODetailComponent>;
        let service: EntityWithServiceImplAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndDTODetailComponent],
                providers: [
                    EntityWithServiceImplAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceImplAndDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceImplAndDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
