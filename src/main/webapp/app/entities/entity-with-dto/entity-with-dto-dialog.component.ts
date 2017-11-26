import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntityWithDTO } from './entity-with-dto.model';
import { EntityWithDTOPopupService } from './entity-with-dto-popup.service';
import { EntityWithDTOService } from './entity-with-dto.service';

@Component({
    selector: 'jhi-entity-with-dto-dialog',
    templateUrl: './entity-with-dto-dialog.component.html'
})
export class EntityWithDTODialogComponent implements OnInit {

    entityWithDTO: EntityWithDTO;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entityWithDTOService: EntityWithDTOService,
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
        if (this.entityWithDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithDTOService.update(this.entityWithDTO));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithDTOService.create(this.entityWithDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithDTO>) {
        result.subscribe((res: EntityWithDTO) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithDTO) {
        this.eventManager.broadcast({ name: 'entityWithDTOListModification', content: 'OK'});
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
    selector: 'jhi-entity-with-dto-popup',
    template: ''
})
export class EntityWithDTOPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithDTOPopupService: EntityWithDTOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithDTOPopupService
                    .open(EntityWithDTODialogComponent as Component, params['id']);
            } else {
                this.entityWithDTOPopupService
                    .open(EntityWithDTODialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
