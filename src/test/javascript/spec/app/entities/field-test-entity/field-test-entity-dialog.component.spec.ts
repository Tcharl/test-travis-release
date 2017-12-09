/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestEntityDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity-dialog.component';
import { FieldTestEntityService } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.service';
import { FieldTestEntity } from '../../../../../../main/webapp/app/entities/field-test-entity/field-test-entity.model';

describe('Component Tests', () => {

    describe('FieldTestEntity Management Dialog Component', () => {
        let comp: FieldTestEntityDialogComponent;
        let fixture: ComponentFixture<FieldTestEntityDialogComponent>;
        let service: FieldTestEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestEntityDialogComponent],
                providers: [
                    FieldTestEntityService
                ]
            })
            .overrideTemplate(FieldTestEntityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestEntityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestEntityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestEntity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fieldTestEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestEntity();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fieldTestEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
