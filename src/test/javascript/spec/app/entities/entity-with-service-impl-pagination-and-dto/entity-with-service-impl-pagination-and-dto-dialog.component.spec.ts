/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplPaginationAndDTODialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto-dialog.component';
import { EntityWithServiceImplPaginationAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.service';
import { EntityWithServiceImplPaginationAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-pagination-and-dto/entity-with-service-impl-pagination-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplPaginationAndDTO Management Dialog Component', () => {
        let comp: EntityWithServiceImplPaginationAndDTODialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplPaginationAndDTODialogComponent>;
        let service: EntityWithServiceImplPaginationAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplPaginationAndDTODialogComponent],
                providers: [
                    EntityWithServiceImplPaginationAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplPaginationAndDTODialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplPaginationAndDTODialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplPaginationAndDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImplPaginationAndDTO(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImplPaginationAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplPaginationAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImplPaginationAndDTO();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImplPaginationAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplPaginationAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
