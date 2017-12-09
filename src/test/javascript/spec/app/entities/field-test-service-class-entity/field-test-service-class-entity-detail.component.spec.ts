/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity-detail.component';
import { FieldTestServiceClassEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.service';
import { FieldTestServiceClassEntity } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.model';

describe('Component Tests', () => {

    describe('FieldTestServiceClassEntity Management Detail Component', () => {
        let comp: FieldTestServiceClassEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityDetailComponent>;
        let service: FieldTestServiceClassEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceClassEntityDetailComponent],
                providers: [
                    FieldTestServiceClassEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceClassEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceClassEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestServiceClassEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestServiceClassEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
