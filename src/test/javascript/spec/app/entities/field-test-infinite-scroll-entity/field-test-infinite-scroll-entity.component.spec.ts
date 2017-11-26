/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.component';
import { FieldTestInfiniteScrollEntityService } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.service';
import { FieldTestInfiniteScrollEntity } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.model';

describe('Component Tests', () => {

    describe('FieldTestInfiniteScrollEntity Management Component', () => {
        let comp: FieldTestInfiniteScrollEntityComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityComponent>;
        let service: FieldTestInfiniteScrollEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestInfiniteScrollEntityComponent],
                providers: [
                    FieldTestInfiniteScrollEntityService
                ]
            })
            .overrideTemplate(FieldTestInfiniteScrollEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestInfiniteScrollEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestInfiniteScrollEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestInfiniteScrollEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
