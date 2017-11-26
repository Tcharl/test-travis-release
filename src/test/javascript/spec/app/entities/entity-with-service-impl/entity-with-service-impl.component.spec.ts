/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.component';
import { EntityWithServiceImplService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.service';
import { EntityWithServiceImpl } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImpl Management Component', () => {
        let comp: EntityWithServiceImplComponent;
        let fixture: ComponentFixture<EntityWithServiceImplComponent>;
        let service: EntityWithServiceImplService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplComponent],
                providers: [
                    EntityWithServiceImplService
                ]
            })
            .overrideTemplate(EntityWithServiceImplComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceImpl(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceImpls[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
