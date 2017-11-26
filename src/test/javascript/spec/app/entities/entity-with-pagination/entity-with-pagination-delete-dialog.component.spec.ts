/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination-delete-dialog.component';
import { EntityWithPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.service';

describe('Component Tests', () => {

    describe('EntityWithPagination Management Delete Component', () => {
        let comp: EntityWithPaginationDeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithPaginationDeleteDialogComponent>;
        let service: EntityWithPaginationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationDeleteDialogComponent],
                providers: [
                    EntityWithPaginationService
                ]
            })
            .overrideTemplate(EntityWithPaginationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
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
