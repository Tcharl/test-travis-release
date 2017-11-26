/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithDTODialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto-dialog.component';
import { EntityWithDTOService } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.service';
import { EntityWithDTO } from '../../../../../../main/webapp/app/entities/entity-with-dto/entity-with-dto.model';

describe('Component Tests', () => {

    describe('EntityWithDTO Management Dialog Component', () => {
        let comp: EntityWithDTODialogComponent;
        let fixture: ComponentFixture<EntityWithDTODialogComponent>;
        let service: EntityWithDTOService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithDTODialogComponent],
                providers: [
                    EntityWithDTOService
                ]
            })
            .overrideTemplate(EntityWithDTODialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithDTODialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithDTOService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithDTO(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithDTO();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithDTO = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithDTOListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
