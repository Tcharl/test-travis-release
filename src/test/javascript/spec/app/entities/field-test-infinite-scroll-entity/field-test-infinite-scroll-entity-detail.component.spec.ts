/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityDetailComponent } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-detail.component';
import { FieldTestInfiniteScrollEntityService } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.service';
import { FieldTestInfiniteScrollEntity } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.model';

describe('Component Tests', () => {

    describe('FieldTestInfiniteScrollEntity Management Detail Component', () => {
        let comp: FieldTestInfiniteScrollEntityDetailComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityDetailComponent>;
        let service: FieldTestInfiniteScrollEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestInfiniteScrollEntityDetailComponent],
                providers: [
                    FieldTestInfiniteScrollEntityService
                ]
            })
            .overrideTemplate(FieldTestInfiniteScrollEntityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestInfiniteScrollEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldTestInfiniteScrollEntity(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fieldTestInfiniteScrollEntity).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
