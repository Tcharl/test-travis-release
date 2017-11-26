import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { FieldTestServiceImplEntity } from './field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityPopupService } from './field-test-service-impl-entity-popup.service';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';

@Component({
    selector: 'jhi-field-test-service-impl-entity-dialog',
    templateUrl: './field-test-service-impl-entity-dialog.component.html'
})
export class FieldTestServiceImplEntityDialogComponent implements OnInit {

    fieldTestServiceImplEntity: FieldTestServiceImplEntity;
    isSaving: boolean;
    localDateMikaDp: any;
    localDateRequiredMikaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.fieldTestServiceImplEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestServiceImplEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestServiceImplEntityService.update(this.fieldTestServiceImplEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestServiceImplEntityService.create(this.fieldTestServiceImplEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestServiceImplEntity>) {
        result.subscribe((res: FieldTestServiceImplEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestServiceImplEntity) {
        this.eventManager.broadcast({ name: 'fieldTestServiceImplEntityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-field-test-service-impl-entity-popup',
    template: ''
})
export class FieldTestServiceImplEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestServiceImplEntityPopupService: FieldTestServiceImplEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestServiceImplEntityPopupService
                    .open(FieldTestServiceImplEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestServiceImplEntityPopupService
                    .open(FieldTestServiceImplEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
