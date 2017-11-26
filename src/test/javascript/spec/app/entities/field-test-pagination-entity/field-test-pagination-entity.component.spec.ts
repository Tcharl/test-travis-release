/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestPaginationEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity.component';
import { FieldTestPaginationEntityService } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity.service';
import { FieldTestPaginationEntity } from '../../../../../../main/webapp/app/entities/field-test-pagination-entity/field-test-pagination-entity.model';

describe('Component Tests', () => {

    describe('FieldTestPaginationEntity Management Component', () => {
        let comp: FieldTestPaginationEntityComponent;
        let fixture: ComponentFixture<FieldTestPaginationEntityComponent>;
        let service: FieldTestPaginationEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestPaginationEntityComponent],
                providers: [
                    FieldTestPaginationEntityService
                ]
            })
            .overrideTemplate(FieldTestPaginationEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestPaginationEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPaginationEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestPaginationEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestPaginationEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
