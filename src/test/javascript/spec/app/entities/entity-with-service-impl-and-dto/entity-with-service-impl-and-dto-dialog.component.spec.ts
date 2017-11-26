/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplAndDTODialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto-dialog.component';
import { EntityWithServiceImplAndDTOService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.service';
import { EntityWithServiceImplAndDTO } from '../../../../../../main/webapp/app/entities/entity-with-service-impl-and-dto/entity-with-service-impl-and-dto.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImplAndDTO Management Dialog Component', () => {
        let comp: EntityWithServiceImplAndDTODialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplAndDTODialogComponent>;
        let service: EntityWithServiceImplAndDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplAndDTODialogComponent],
                providers: [
                    EntityWithServiceImplAndDTOService
                ]
            })
            .overrideTemplate(EntityWithServiceImplAndDTODialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplAndDTODialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplAndDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImplAndDTO(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImplAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImplAndDTO();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImplAndDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplAndDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
