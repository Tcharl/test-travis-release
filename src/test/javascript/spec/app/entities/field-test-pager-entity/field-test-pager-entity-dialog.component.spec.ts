/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestPagerEntityDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity-dialog.component';
import { FieldTestPagerEntityService } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.service';
import { FieldTestPagerEntity } from '../../../../../../main/webapp/app/entities/field-test-pager-entity/field-test-pager-entity.model';

describe('Component Tests', () => {

    describe('FieldTestPagerEntity Management Dialog Component', () => {
        let comp: FieldTestPagerEntityDialogComponent;
        let fixture: ComponentFixture<FieldTestPagerEntityDialogComponent>;
        let service: FieldTestPagerEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestPagerEntityDialogComponent],
                providers: [
                    FieldTestPagerEntityService
                ]
            })
            .overrideTemplate(FieldTestPagerEntityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestPagerEntityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestPagerEntityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestPagerEntity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fieldTestPagerEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestPagerEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestPagerEntity();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fieldTestPagerEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestPagerEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
