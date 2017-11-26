import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EntityWithServiceClass } from './entity-with-service-class.model';
import { EntityWithServiceClassPopupService } from './entity-with-service-class-popup.service';
import { EntityWithServiceClassService } from './entity-with-service-class.service';

@Component({
    selector: 'jhi-entity-with-service-class-dialog',
    templateUrl: './entity-with-service-class-dialog.component.html'
})
export class EntityWithServiceClassDialogComponent implements OnInit {

    entityWithServiceClass: EntityWithServiceClass;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private entityWithServiceClassService: EntityWithServiceClassService,
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
        if (this.entityWithServiceClass.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassService.update(this.entityWithServiceClass));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceClassService.create(this.entityWithServiceClass));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithServiceClass>) {
        result.subscribe((res: EntityWithServiceClass) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithServiceClass) {
        this.eventManager.broadcast({ name: 'entityWithServiceClassListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-entity-with-service-class-popup',
    template: ''
})
export class EntityWithServiceClassPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithServiceClassPopupService: EntityWithServiceClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithServiceClassPopupService
                    .open(EntityWithServiceClassDialogComponent as Component, params['id']);
            } else {
                this.entityWithServiceClassPopupService
                    .open(EntityWithServiceClassDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
