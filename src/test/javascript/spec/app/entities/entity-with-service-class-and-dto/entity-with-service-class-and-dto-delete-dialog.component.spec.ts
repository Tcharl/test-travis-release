/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndDTODeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto-delete-dialog.component';
import { EntityWithServiceClassAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-dto/entity-with-service-class-and-dto.service';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndDTO Management Delete Component', () => {
        let comp: EntityWithServiceClassAndDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndDTODeleteDialogComponent>;
        let service: EntityWithServiceClassAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndDTODeleteDialogComponent],
                providers: [
                    EntityWithServiceClassAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndDTODeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndDTOService);
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
