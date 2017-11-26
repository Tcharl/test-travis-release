/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.component';
import { EntityWithDTOService } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.service';
import { EntityWithDTO } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.model';

describe('Component Tests', () => {

    describe('EntityWithDTO Management Component', () => {
        let comp: EntityWithDTOComponent;
        let fixture: ComponentFixture<EntityWithDTOComponent>;
        let service: EntityWithDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithDTOComponent],
                providers: [
                    EntityWithDTOService
                ]
            })
            .overrideTemplate(EntityWithDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
