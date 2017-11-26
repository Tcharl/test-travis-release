import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImplAndDTO } from './entity-with-service-impl-and-dto.model';
import { EntityWithServiceImplAndDTOPopupService } from './entity-with-service-impl-and-dto-popup.service';
import { EntityWithServiceImplAndDTOService } from './entity-with-service-impl-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto-dialog',
    templateUrl: './entity-with-service-impl-and-dto-dialog.component.html'
})
export class EntityWithServiceImplAndDTODialogComponent implements OnInit {

    entityWithServiceImplAndDTO: EntityWithServiceImplAndDTO;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entityWithServiceImplAndDTOService: EntityWithServiceImplAndDTOService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entityWithServiceImplAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplAndDTOService.update(this.entityWithServiceImplAndDTO));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplAndDTOService.create(this.entityWithServiceImplAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithServiceImplAndDTO>) {
        result.subscribe((res: EntityWithServiceImplAndDTO) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithServiceImplAndDTO) {
        this.eventManager.broadcast({ name: 'entityWithServiceImplAndDTOListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-entity-with-service-impl-and-dto-popup',
    template: ''
})
export class EntityWithServiceImplAndDTOPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithServiceImplAndDTOPopupService: EntityWithServiceImplAndDTOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithServiceImplAndDTOPopupService
                    .open(EntityWithServiceImplAndDTODialogComponent as Component, params['id']);
            } else {
                this.entityWithServiceImplAndDTOPopupService
                    .open(EntityWithServiceImplAndDTODialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
