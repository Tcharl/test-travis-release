/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceImplEntityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity-delete-dialog.component';
import { FieldTestServiceImplEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-impl-entity/field-test-service-impl-entity.service';

describe('Component Tests', () => {

    describe('FieldTestServiceImplEntity Management Delete Component', () => {
        let comp: FieldTestServiceImplEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestServiceImplEntityDeleteDialogComponent>;
        let service: FieldTestServiceImplEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceImplEntityDeleteDialogComponent],
                providers: [
                    FieldTestServiceImplEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceImplEntityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceImplEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceImplEntityService);
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
