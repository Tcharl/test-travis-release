/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestServiceClassEntityDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity-dialog.component';
import { FieldTestServiceClassEntityService } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.service';
import { FieldTestServiceClassEntity } from '../../../../../../main/webapp/app/entities/field-test-service-class-entity/field-test-service-class-entity.model';

describe('Component Tests', () => {

    describe('FieldTestServiceClassEntity Management Dialog Component', () => {
        let comp: FieldTestServiceClassEntityDialogComponent;
        let fixture: ComponentFixture<FieldTestServiceClassEntityDialogComponent>;
        let service: FieldTestServiceClassEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestServiceClassEntityDialogComponent],
                providers: [
                    FieldTestServiceClassEntityService
                ]
            })
            .overrideTemplate(FieldTestServiceClassEntityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestServiceClassEntityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestServiceClassEntityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestServiceClassEntity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fieldTestServiceClassEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestServiceClassEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestServiceClassEntity();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fieldTestServiceClassEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestServiceClassEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
