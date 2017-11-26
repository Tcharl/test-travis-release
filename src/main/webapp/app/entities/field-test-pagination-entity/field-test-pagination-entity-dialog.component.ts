import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { FieldTestPaginationEntity } from './field-test-pagination-entity.model';
import { FieldTestPaginationEntityPopupService } from './field-test-pagination-entity-popup.service';
import { FieldTestPaginationEntityService } from './field-test-pagination-entity.service';

@Component({
    selector: 'jhi-field-test-pagination-entity-dialog',
    templateUrl: './field-test-pagination-entity-dialog.component.html'
})
export class FieldTestPaginationEntityDialogComponent implements OnInit {

    fieldTestPaginationEntity: FieldTestPaginationEntity;
    isSaving: boolean;
    localDateAliceDp: any;
    localDateRequiredAliceDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private fieldTestPaginationEntityService: FieldTestPaginationEntityService,
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
        this.dataUtils.clearInputImage(this.fieldTestPaginationEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestPaginationEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestPaginationEntityService.update(this.fieldTestPaginationEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestPaginationEntityService.create(this.fieldTestPaginationEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestPaginationEntity>) {
        result.subscribe((res: FieldTestPaginationEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestPaginationEntity) {
        this.eventManager.broadcast({ name: 'fieldTestPaginationEntityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-field-test-pagination-entity-popup',
    template: ''
})
export class FieldTestPaginationEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestPaginationEntityPopupService: FieldTestPaginationEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestPaginationEntityPopupService
                    .open(FieldTestPaginationEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestPaginationEntityPopupService
                    .open(FieldTestPaginationEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
