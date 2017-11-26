/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassPaginationAndDTOComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.component';
import { EntityWithServiceClassPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.service';
import { EntityWithServiceClassPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassPaginationAndDTO Management Component', () => {
        let comp: EntityWithServiceClassPaginationAndDTOComponent;
        let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTOComponent>;
        let service: EntityWithServiceClassPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassPaginationAndDTOComponent],
                providers: [
                    EntityWithServiceClassPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassPaginationAndDTOComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTOComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EntityWithServiceClassPaginationAndDTO(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.entityWithServiceClassPaginationAndDTOS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
