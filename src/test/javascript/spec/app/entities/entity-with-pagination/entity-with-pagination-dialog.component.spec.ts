/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithPaginationDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination-dialog.component';
import { EntityWithPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.service';
import { EntityWithPagination } from '../../../../../../main/webapp/app/entities/entity-with-pagination/entity-with-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithPagination Management Dialog Component', () => {
        let comp: EntityWithPaginationDialogComponent;
        let fixture: ComponentFixture<EntityWithPaginationDialogComponent>;
        let service: EntityWithPaginationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithPaginationDialogComponent],
                providers: [
                    EntityWithPaginationService
                ]
            })
            .overrideTemplate(EntityWithPaginationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithPaginationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithPaginationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithPagination(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithPagination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithPaginationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithPagination();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithPagination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithPaginationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
