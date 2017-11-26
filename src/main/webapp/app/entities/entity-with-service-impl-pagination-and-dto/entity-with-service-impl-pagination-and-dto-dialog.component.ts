import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImplPaginationAndDTO } from './entity-with-service-impl-pagination-and-dto.model';
import { EntityWithServiceImplPaginationAndDTOPopupService } from './entity-with-service-impl-pagination-and-dto-popup.service';
import { EntityWithServiceImplPaginationAndDTOService } from './entity-with-service-impl-pagination-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-impl-pagination-and-dto-dialog',
    templateUrl: './entity-with-service-impl-pagination-and-dto-dialog.component.html'
})
export class EntityWithServiceImplPaginationAndDTODialogComponent implements OnInit {

    entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTO;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entityWithServiceImplPaginationAndDTOService: EntityWithServiceImplPaginationAndDTOService,
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
        if (this.entityWithServiceImplPaginationAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplPaginationAndDTOService.update(this.entityWithServiceImplPaginationAndDTO));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplPaginationAndDTOService.create(this.entityWithServiceImplPaginationAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithServiceImplPaginationAndDTO>) {
        result.subscribe((res: EntityWithServiceImplPaginationAndDTO) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithServiceImplPaginationAndDTO) {
        this.eventManager.broadcast({ name: 'entityWithServiceImplPaginationAndDTOListModification', content: 'OK'});
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
    selector: 'jhi-entity-with-service-impl-pagination-and-dto-popup',
    template: ''
})
export class EntityWithServiceImplPaginationAndDTOPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithServiceImplPaginationAndDTOPopupService: EntityWithServiceImplPaginationAndDTOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithServiceImplPaginationAndDTOPopupService
                    .open(EntityWithServiceImplPaginationAndDTODialogComponent as Component, params['id']);
            } else {
                this.entityWithServiceImplPaginationAndDTOPopupService
                    .open(EntityWithServiceImplPaginationAndDTODialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
