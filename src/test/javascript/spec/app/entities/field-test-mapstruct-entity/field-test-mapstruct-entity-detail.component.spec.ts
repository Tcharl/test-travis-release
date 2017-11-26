/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestMapstructEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-detail.component';
import { FieldTestMapstructEntityService } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';
import { FieldTestMapstructEntity } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.model';

describe('Component Tests', () => {

    describe('FieldTestMapstructEntity Management Detail Component', () => {
        let comp: FieldTestMapstructEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityDetailComponent>;
        let service: FieldTestMapstructEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestMapstructEntityDetailComponent],
                providers: [
                    FieldTestMapstructEntityService
                ]
            })
            .overrideTemplate(FieldTestMapstructEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestMapstructEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestMapstructEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestMapstructEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
