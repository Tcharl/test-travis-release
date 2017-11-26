/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestMapstructEntityDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-delete-dialog.component';
import { FieldTestMapstructEntityService } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';

describe('Component Tests', () => {

    describe('FieldTestMapstructEntity Management Delete Component', () => {
        let comp: FieldTestMapstructEntityDeleteDialogComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityDeleteDialogComponent>;
        let service: FieldTestMapstructEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestMapstructEntityDeleteDialogComponent],
                providers: [
                    FieldTestMapstructEntityService
                ]
            })
            .overrideTemplate(FieldTestMapstructEntityDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestMapstructEntityDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
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
