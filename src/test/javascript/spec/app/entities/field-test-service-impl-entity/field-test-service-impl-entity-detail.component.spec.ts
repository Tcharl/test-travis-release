/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity-detail.component';
import { FieldTestServiceImplEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.service';
import { FieldTestServiceImplEntity } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.model';

describe('Component Tests', () => {

    describe('FieldTestServiceImplEntity Management Detail Component', () => {
        let comp: FieldTestServiceImplEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityDetailComponent>;
        let service: FieldTestServiceImplEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceImplEntityDetailComponent],
                providers: [
                    FieldTestServiceImplEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceImplEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceImplEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceImplEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestServiceImplEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestServiceImplEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
