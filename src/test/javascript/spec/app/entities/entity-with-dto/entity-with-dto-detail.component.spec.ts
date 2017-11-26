/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto-detail.component';
import { EntityWithDTOService } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.service';
import { EntityWithDTO } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.model';

describe('Component Tests', () => {

    describe('EntityWithDTO Management Detail Component', () => {
        let comp: EntityWithDTODetailComponent;
        let fixture: ComponentFixture<EntityWithDTODetailComponent>;
        let service: EntityWithDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithDTODetailComponent],
                providers: [
                    EntityWithDTOService
                ]
            })
            .overrideTemplate(EntityWithDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
