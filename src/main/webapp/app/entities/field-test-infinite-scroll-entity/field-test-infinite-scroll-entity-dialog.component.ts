import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { FieldTestInfiniteScrollEntity } from './field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityPopupService } from './field-test-infinite-scroll-entity-popup.service';
import { FieldTestInfiniteScrollEntityService } from './field-test-infinite-scroll-entity.service';

@Component({
    selector: 'jhi-field-test-infinite-scroll-entity-dialog',
    templateUrl: './field-test-infinite-scroll-entity-dialog.component.html'
})
export class FieldTestInfiniteScrollEntityDialogComponent implements OnInit {

    fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntity;
    isSaving: boolean;
    localDateHugoDp: any;
    localDateRequiredHugoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService,
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
        this.dataUtils.clearInputImage(this.fieldTestInfiniteScrollEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestInfiniteScrollEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestInfiniteScrollEntityService.update(this.fieldTestInfiniteScrollEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestInfiniteScrollEntityService.create(this.fieldTestInfiniteScrollEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestInfiniteScrollEntity>) {
        result.subscribe((res: FieldTestInfiniteScrollEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestInfiniteScrollEntity) {
        this.eventManager.broadcast({ name: 'fieldTestInfiniteScrollEntityListModification', content: 'OK'});
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
    selector: 'jhi-field-test-infinite-scroll-entity-popup',
    template: ''
})
export class FieldTestInfiniteScrollEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestInfiniteScrollEntityPopupService: FieldTestInfiniteScrollEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestInfiniteScrollEntityPopupService
                    .open(FieldTestInfiniteScrollEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestInfiniteScrollEntityPopupService
                    .open(FieldTestInfiniteScrollEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
