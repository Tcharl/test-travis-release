/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestPagerEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity-detail.component';
import { FieldTestPagerEntityService } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.service';
import { FieldTestPagerEntity } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.model';

describe('Component Tests', () => {

    describe('FieldTestPagerEntity Management Detail Component', () => {
        let comp: FieldTestPagerEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityDetailComponent>;
        let service: FieldTestPagerEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestPagerEntityDetailComponent],
                providers: [
                    FieldTestPagerEntityService
                ]
            })
            .overrideTemplate(FieldTestPagerEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestPagerEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPagerEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestPagerEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestPagerEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
