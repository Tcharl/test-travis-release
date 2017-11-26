import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EntityWithServiceImpl } from './entity-with-service-impl.model';
import { EntityWithServiceImplPopupService } from './entity-with-service-impl-popup.service';
import { EntityWithServiceImplService } from './entity-with-service-impl.service';

@Component({
    selector: 'jhi-entity-with-service-impl-dialog',
    templateUrl: './entity-with-service-impl-dialog.component.html'
})
export class EntityWithServiceImplDialogComponent implements OnInit {

    entityWithServiceImpl: EntityWithServiceImpl;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entityWithServiceImplService: EntityWithServiceImplService,
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
        if (this.entityWithServiceImpl.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplService.update(this.entityWithServiceImpl));
        } else {
            this.subscribeToSaveResponse(
                this.entityWithServiceImplService.create(this.entityWithServiceImpl));
        }
    }

    private subscribeToSaveResponse(result: Observable<EntityWithServiceImpl>) {
        result.subscribe((res: EntityWithServiceImpl) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EntityWithServiceImpl) {
        this.eventManager.broadcast({ name: 'entityWithServiceImplListModification', content: 'OK'});
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
    selector: 'jhi-entity-with-service-impl-popup',
    template: ''
})
export class EntityWithServiceImplPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entityWithServiceImplPopupService: EntityWithServiceImplPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entityWithServiceImplPopupService
                    .open(EntityWithServiceImplDialogComponent as Component, params['id']);
            } else {
                this.entityWithServiceImplPopupService
                    .open(EntityWithServiceImplDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
