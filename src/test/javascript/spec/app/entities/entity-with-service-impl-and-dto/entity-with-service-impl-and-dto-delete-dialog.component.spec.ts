/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTODeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-delete-dialog.component';
import { EntityWithServiceImplAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndDTO Management Delete Component', () => {
        let comp: EntityWithServiceImplAndDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTODeleteDialogComponent>;
        let service: EntityWithServiceImplAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndDTODeleteDialogComponent],
                providers: [
                    EntityWithServiceImplAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndDTODeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
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
