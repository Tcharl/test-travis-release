/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestPaginationEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity-detail.component';
import { FieldTestPaginationEntityService } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity.service';
import { FieldTestPaginationEntity } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity.model';

describe('Component Tests', () => {

    describe('FieldTestPaginationEntity Management Detail Component', () => {
        let comp: FieldTestPaginationEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestPaginationEntityDetailComponent>;
        let service: FieldTestPaginationEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestPaginationEntityDetailComponent],
                providers: [
                    FieldTestPaginationEntityService
                ]
            })
            .overrideTemplate(FieldTestPaginationEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestPaginationEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPaginationEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestPaginationEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestPaginationEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
