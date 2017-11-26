/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.component';
import { EntityWithServiceClassAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.service';
import { EntityWithServiceClassAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndDTO Management Component', () => {
        let comp: EntityWithServiceClassAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTOComponent>;
        let service: EntityWithServiceClassAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndDTOComponent],
                providers: [
                    EntityWithServiceClassAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceClassAndDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceClassAndDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
