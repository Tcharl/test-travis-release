/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestMapstructEntityDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity-dialog.component';
import { FieldTestMapstructEntityService } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.service';
import { FieldTestMapstructEntity } from '../../../../../../main/webapp/app/entities/field-test-mapstruct-entity/field-test-mapstruct-entity.model';

describe('Component Tests', () => {

    describe('FieldTestMapstructEntity Management Dialog Component', () => {
        let comp: FieldTestMapstructEntityDialogComponent;
        let fixture: ComponentFixture<FieldTestMapstructEntityDialogComponent>;
        let service: FieldTestMapstructEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestMapstructEntityDialogComponent],
                providers: [
                    FieldTestMapstructEntityService
                ]
            })
            .overrideTemplate(FieldTestMapstructEntityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestMapstructEntityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestMapstructEntityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestMapstructEntity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fieldTestMapstructEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestMapstructEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestMapstructEntity();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fieldTestMapstructEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestMapstructEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
