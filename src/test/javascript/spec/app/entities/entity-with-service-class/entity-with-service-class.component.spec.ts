/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class.component';
import { EntityWithServiceClassService } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class.service';
import { EntityWithServiceClass } from '../../../../../../main/webapp/app/entities/entity-with-service-class/entity-with-service-class.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClass Management Component', () => {
        let comp: EntityWithServiceClassComponent;
        let fixture: ComponentFixture<EntityWithServiceClassComponent>;
        let service: EntityWithServiceClassService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassComponent],
                providers: [
                    EntityWithServiceClassService
                ]
            })
            .overrideTemplate(EntityWithServiceClassComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceClass(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceClasses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
