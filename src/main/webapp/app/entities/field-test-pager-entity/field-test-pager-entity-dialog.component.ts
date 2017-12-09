import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { FieldTestPagerEntity } from './field-test-pager-entity.model';
import { FieldTestPagerEntityPopupService } from './field-test-pager-entity-popup.service';
import { FieldTestPagerEntityService } from './field-test-pager-entity.service';

@Component({
    selector: 'jhi-field-test-pager-entity-dialog',
    templateUrl: './field-test-pager-entity-dialog.component.html'
})
export class FieldTestPagerEntityDialogComponent implements OnInit {

    fieldTestPagerEntity: FieldTestPagerEntity;
    isSaving: boolean;
    localDateJadeDp: any;
    localDateRequiredJadeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private fieldTestPagerEntityService: FieldTestPagerEntityService,
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
        this.dataUtils.clearInputImage(this.fieldTestPagerEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestPagerEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestPagerEntityService.update(this.fieldTestPagerEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestPagerEntityService.create(this.fieldTestPagerEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestPagerEntity>) {
        result.subscribe((res: FieldTestPagerEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestPagerEntity) {
        this.eventManager.broadcast({ name: 'fieldTestPagerEntityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-field-test-pager-entity-popup',
    template: ''
})
export class FieldTestPagerEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestPagerEntityPopupService: FieldTestPagerEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestPagerEntityPopupService
                    .open(FieldTestPagerEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestPagerEntityPopupService
                    .open(FieldTestPagerEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
