/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-detail.component';
import { EntityWithServiceClassAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.service';
import { EntityWithServiceClassAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndDTO Management Detail Component', () => {
        let comp: EntityWithServiceClassAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTODetailComponent>;
        let service: EntityWithServiceClassAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndDTODetailComponent],
                providers: [
                    EntityWithServiceClassAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithServiceClassAndDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithServiceClassAndDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
