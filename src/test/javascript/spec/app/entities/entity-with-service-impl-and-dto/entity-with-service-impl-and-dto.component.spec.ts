/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.component';
import { EntityWithServiceImplAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndDTO Management Component', () => {
        let comp: EntityWithServiceImplAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTOComponent>;
        let service: EntityWithServiceImplAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndDTOComponent],
                providers: [
                    EntityWithServiceImplAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceImplAndDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceImplAndDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
