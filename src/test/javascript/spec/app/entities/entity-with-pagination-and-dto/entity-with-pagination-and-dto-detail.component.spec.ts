/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTODetailComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-detail.component';
import { EntityWithPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.service';
import { EntityWithPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithPaginationAndDTO Management Detail Component', () => {
        let comp: EntityWithPaginationAndDTODetailComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTODetailComponent>;
        let service: EntityWithPaginationAndDTOService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationAndDTODetailComponent],
                providers: [
                    EntityWithPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithPaginationAndDTODetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationAndDTODetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationAndDTOService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EntityWithPaginationAndDTO(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.entityWithPaginationAndDTO).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
