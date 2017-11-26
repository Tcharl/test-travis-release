/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.component';
import { FieldTestServiceImplEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.service';
import { FieldTestServiceImplEntity } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.model';

describe('Component Tests', () => {

    describe('FieldTestServiceImplEntity Management Component', () => {
        let comp: FieldTestServiceImplEntityComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityComponent>;
        let service: FieldTestServiceImplEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceImplEntityComponent],
                providers: [
                    FieldTestServiceImplEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceImplEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceImplEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceImplEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestServiceImplEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestServiceImplEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
