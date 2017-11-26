/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.component';
import { EntityWithPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.service';
import { EntityWithPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithPaginationAndDTO Management Component', () => {
        let comp: EntityWithPaginationAndDTOComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTOComponent>;
        let service: EntityWithPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationAndDTOComponent],
                providers: [
                    EntityWithPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithPaginationAndDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithPaginationAndDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithPaginationAndDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
