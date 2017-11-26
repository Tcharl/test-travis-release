import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EntityWithServiceClassPaginationAndDTO } from './entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOPopupService } from './entity-with-service-class-pagination-and-dto-popup.service';
import { EntityWithServiceClassPaginationAndDTOService } from './entity-with-service-class-pagination-and-dto.service';

@Component({
    selector: 'jhi-entity-with-service-class-pagination-and-dto-dialog',
    templateUrl: './entity-with-service-class-pagination-and-dto-dialog.component.html'
})
export class EntityWithServiceClassPaginationAndDTODialogComponent implements OnInit {

    entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTO;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService,
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
        if (this.entityWithServiceClassPaginationAndDTO.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassPaginationAndDTOService.update(this.entityWithServiceClassPaginationAndDTO));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassPaginationAndDTOService.create(this.entityWithServiceClassPaginationAndDTO));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithServiceClassPaginationAndDTO>) {
        result.subscribe((res: EntityWithServiceClassPaginationAndDTO) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithServiceClassPaginationAndDTO) {
        this.eventManager.broadcast({ name: 'entityWithServiceClassPaginationAndDTOListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-entity-with-service-class-pagination-and-dto-popup',
    template: ''
})
export class EntityWithServiceClassPaginationAndDTOPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithServiceClassPaginationAndDTOPopupService: EntityWithServiceClassPaginationAndDTOPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithServiceClassPaginationAndDTOPopupService
                    .open(EntityWithServiceClassPaginationAndDTODialogComponent as Component, params['id']);
            } else {
                this.entityWithServiceClassPaginationAndDTOPopupService
                    .open(EntityWithServiceClassPaginationAndDTODialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
