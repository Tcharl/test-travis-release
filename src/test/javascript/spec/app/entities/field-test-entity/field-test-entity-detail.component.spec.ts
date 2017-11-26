/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity-detail.component';
import { FieldTestEntityService } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.service';
import { FieldTestEntity } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.model';

describe('Component Tests', () => {

    describe('FieldTestEntity Management Detail Component', () => {
        let comp: FieldTestEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestEntityDetailComponent>;
        let service: FieldTestEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestEntityDetailComponent],
                providers: [
                    FieldTestEntityService
                ]
            })
            .overrideTemplate(FieldTestEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
