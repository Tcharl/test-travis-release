/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceClassPaginationAndDTODialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto-dialog.component';
import { EntityWithServiceClassPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.service';
import { EntityWithServiceClassPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-class-pagination-and-dto/entity-with-service-class-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceClassPaginationAndDTO Management Dialog Component', () => {
        let comp: EntityWithServiceClassPaginationAndDTODialogComponent;
        let fixture: ComponentFixture<EntityWithServiceClassPaginationAndDTODialogComponent>;
        let service: EntityWithServiceClassPaginationAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceClassPaginationAndDTODialogComponent],
                providers: [
                    EntityWithServiceClassPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceClassPaginationAndDTODialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceClassPaginationAndDTODialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceClassPaginationAndDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceClassPaginationAndDTO(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceClassPaginationAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceClassPaginationAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceClassPaginationAndDTO();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceClassPaginationAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceClassPaginationAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
