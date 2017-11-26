/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.component';
import { FieldTestEntityService } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.service';
import { FieldTestEntity } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.model';

describe('Component Tests', () => {

    describe('FieldTestEntity Management Component', () => {
        let comp: FieldTestEntityComponent;
        let fixture: ComponentFixture<FieldTestEntityComponent>;
        let service: FieldTestEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestEntityComponent],
                providers: [
                    FieldTestEntityService
                ]
            })
            .overrideTemplate(FieldTestEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
