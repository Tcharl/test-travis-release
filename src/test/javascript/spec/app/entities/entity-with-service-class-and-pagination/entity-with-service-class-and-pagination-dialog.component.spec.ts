/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassAndPaginationDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination-dialog.component';
import { EntityWithServiceClassAndPaginationService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.service';
import { EntityWithServiceClassAndPagination } from '../../../../../../main/webapp/app/entities/entity-with-service-class-and-pagination/entity-with-service-class-and-pagination.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassAndPagination Management Dialog Component', () => {
        let comp: EntityWithServiceClassAndPaginationDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceClassAndPaginationDialogComponent>;
        let service: EntityWithServiceClassAndPaginationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassAndPaginationDialogComponent],
                providers: [
                    EntityWithServiceClassAndPaginationService
                ]
            })
            .overrideTemplate(EntityWithServiceClassAndPaginationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassAndPaginationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassAndPaginationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceClassAndPagination(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceClassAndPagination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceClassAndPaginationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceClassAndPagination();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceClassAndPagination = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceClassAndPaginationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
