/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { FieldTestInfiniteScrollEntityDialogComponent } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity-dialog.component';
import { FieldTestInfiniteScrollEntityService } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.service';
import { FieldTestInfiniteScrollEntity } from '../../../../../../main/webapp/app/entities/field-test-infinite-scroll-entity/field-test-infinite-scroll-entity.model';

describe('Component Tests', () => {

    describe('FieldTestInfiniteScrollEntity Management Dialog Component', () => {
        let comp: FieldTestInfiniteScrollEntityDialogComponent;
        let fixture: ComponentFixture<FieldTestInfiniteScrollEntityDialogComponent>;
        let service: FieldTestInfiniteScrollEntityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [FieldTestInfiniteScrollEntityDialogComponent],
                providers: [
                    FieldTestInfiniteScrollEntityService
                ]
            })
            .overrideTemplate(FieldTestInfiniteScrollEntityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldTestInfiniteScrollEntityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldTestInfiniteScrollEntityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestInfiniteScrollEntity(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fieldTestInfiniteScrollEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestInfiniteScrollEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldTestInfiniteScrollEntity();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fieldTestInfiniteScrollEntity = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldTestInfiniteScrollEntityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
