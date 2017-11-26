/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.component';
import { FieldTestServiceClassEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.service';
import { FieldTestServiceClassEntity } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.model';

describe('Component Tests', () => {

    describe('FieldTestServiceClassEntity Management Component', () => {
        let comp: FieldTestServiceClassEntityComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityComponent>;
        let service: FieldTestServiceClassEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceClassEntityComponent],
                providers: [
                    FieldTestServiceClassEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceClassEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceClassEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestServiceClassEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestServiceClassEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
