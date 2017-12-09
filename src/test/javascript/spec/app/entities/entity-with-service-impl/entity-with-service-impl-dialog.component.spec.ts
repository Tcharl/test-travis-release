/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { EntityWithServiceImplDialogComponent } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl-dialog.component';
import { EntityWithServiceImplService } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.service';
import { EntityWithServiceImpl } from '../../../../../../main/webapp/app/entities/entity-with-service-impl/entity-with-service-impl.model';

describe('Component Tests', () => {

    describe('EntityWithServiceImpl Management Dialog Component', () => {
        let comp: EntityWithServiceImplDialogComponent;
        let fixture: ComponentFixture<EntityWithServiceImplDialogComponent>;
        let service: EntityWithServiceImplService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [EntityWithServiceImplDialogComponent],
                providers: [
                    EntityWithServiceImplService
                ]
            })
            .overrideTemplate(EntityWithServiceImplDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EntityWithServiceImplDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EntityWithServiceImplService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImpl(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImpl = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EntityWithServiceImpl();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.entityWithServiceImpl = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'entityWithServiceImplListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
