/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplPaginationAndDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.component';
import { EntityWithServiceImplPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.service';
import { EntityWithServiceImplPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplPaginationAndDTO Management Component', () => {
        let comp: EntityWithServiceImplPaginationAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTOComponent>;
        let service: EntityWithServiceImplPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplPaginationAndDTOComponent],
                providers: [
                    EntityWithServiceImplPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplPaginationAndDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceImplPaginationAndDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceImplPaginationAndDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
