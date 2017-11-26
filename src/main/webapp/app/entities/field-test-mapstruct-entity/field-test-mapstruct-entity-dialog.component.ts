import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FieldTestMapstructEntity } from './field-test-mapstruct-entity.model';
import { FieldTestMapstructEntityPopupService } from './field-test-mapstruct-entity-popup.service';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';

@Component({
    selector: 'jhi-field-test-mapstruct-entity-dialog',
    templateUrl: './field-test-mapstruct-entity-dialog.component.html'
})
export class FieldTestMapstructEntityDialogComponent implements OnInit {

    fieldTestMapstructEntity: FieldTestMapstructEntity;
    isSaving: boolean;
    localDateEvaDp: any;
    localDateRequiredEvaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private fieldTestMapstructEntityService: FieldTestMapstructEntityService,
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
        this.dataUtils.clearInputImage(this.fieldTestMapstructEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestMapstructEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestMapstructEntityService.update(this.fieldTestMapstructEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestMapstructEntityService.create(this.fieldTestMapstructEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestMapstructEntity>) {
        result.subscribe((res: FieldTestMapstructEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestMapstructEntity) {
        this.eventManager.broadcast({ name: 'fieldTestMapstructEntityListModification', content: 'OK'});
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
    selector: 'jhi-field-test-mapstruct-entity-popup',
    template: ''
})
export class FieldTestMapstructEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestMapstructEntityPopupService: FieldTestMapstructEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestMapstructEntityPopupService
                    .open(FieldTestMapstructEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestMapstructEntityPopupService
                    .open(FieldTestMapstructEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
