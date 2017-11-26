/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithDTODeleteDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto-delete-dialog.component';
import { EntityWithDTOService } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.service';

describe('Component Tests', () => {

    describe('EntityWithDTO Management Delete Component', () => {
        let comp: EntityWithDTODeleteDialogComponent;
        let fixture: ComponentFixture<EntityWithDTODeleteDialogComponent>;
        let service: EntityWithDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithDTODeleteDialogComponent],
                providers: [
                    EntityWithDTOService
                ]
            })
            .overrideTemplate(EntityWithDTODeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithDTODeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
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
