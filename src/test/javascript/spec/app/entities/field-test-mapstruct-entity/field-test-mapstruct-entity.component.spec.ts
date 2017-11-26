/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestMapstructEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.component';
import { FieldTestMapstructEntityService } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';
import { FieldTestMapstructEntity } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.model';

describe('Component Tests', () => {

    describe('FieldTestMapstructEntity Management Component', () => {
        let comp: FieldTestMapstructEntityComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityComponent>;
        let service: FieldTestMapstructEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestMapstructEntityComponent],
                providers: [
                    FieldTestMapstructEntityService
                ]
            })
            .overrideTemplate(FieldTestMapstructEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestMapstructEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestMapstructEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestMapstructEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
