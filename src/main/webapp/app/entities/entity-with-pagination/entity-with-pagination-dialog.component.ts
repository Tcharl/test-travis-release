import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EntityWithPagination } from './entity-with-pagination.model';
import { EntityWithPaginationPopupService } from './entity-with-pagination-popup.service';
import { EntityWithPaginationService } from './entity-with-pagination.service';

@Component({
    selector: 'jhi-entity-with-pagination-dialog',
    templateUrl: './entity-with-pagination-dialog.component.html'
})
export class EntityWithPaginationDialogComponent implements OnInit {

    entityWithPagination: EntityWithPagination;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private entityWithPaginationService: EntityWithPaginationService,
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
        if (this.entityWithPagination.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithPaginationService.update(this.entityWithPagination));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithPaginationService.create(this.entityWithPagination));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithPagination>) {
        result.subscribe((res: EntityWithPagination) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithPagination) {
        this.eventManager.broadcast({ name: 'entityWithPaginationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-entity-with-pagination-popup',
    template: ''
})
export class EntityWithPaginationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithPaginationPopupService: EntityWithPaginationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithPaginationPopupService
                    .open(EntityWithPaginationDialogComponent as Component, params['id']);
            } else {
                this.entityWithPaginationPopupService
                    .open(EntityWithPaginationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
