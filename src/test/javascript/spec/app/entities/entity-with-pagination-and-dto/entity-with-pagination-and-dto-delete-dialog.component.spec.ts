/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationAndDTODeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto-delete-dialog.component';
import { EntityWithPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-pagination-and-dto/entity-with-pagination-and-dto.service';

describe('Component Tests', () => {

    describe('EntityWithPaginationAndDTO Management Delete Component', () => {
        let comp: EntityWithPaginationAndDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithPaginationAndDTODeleteDialogComponent>;
        let service: EntityWithPaginationAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationAndDTODeleteDialogComponent],
                providers: [
                    EntityWithPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithPaginationAndDTODeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationAndDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationAndDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
