/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestPagerEntityComponent } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.component';
import { FieldTestPagerEntityService } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.service';
import { FieldTestPagerEntity } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.model';

describe('Component Tests', () => {

    describe('FieldTestPagerEntity Management Component', () => {
        let comp: FieldTestPagerEntityComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityComponent>;
        let service: FieldTestPagerEntityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestPagerEntityComponent],
                providers: [
                    FieldTestPagerEntityService
                ]
            })
            .overrideTemplate(FieldTestPagerEntityComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestPagerEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPagerEntityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldTestPagerEntity(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fieldTestPagerEntities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
