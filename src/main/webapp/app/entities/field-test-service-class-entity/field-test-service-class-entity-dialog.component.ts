import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { FieldTestServiceClassEntity } from './field-test-service-class-entity.model';
import { FieldTestServiceClassEntityPopupService } from './field-test-service-class-entity-popup.service';
import { FieldTestServiceClassEntityService } from './field-test-service-class-entity.service';

@Component({
    selector: 'jhi-field-test-service-class-entity-dialog',
    templateUrl: './field-test-service-class-entity-dialog.component.html'
})
export class FieldTestServiceClassEntityDialogComponent implements OnInit {

    fieldTestServiceClassEntity: FieldTestServiceClassEntity;
    isSaving: boolean;
    localDateBobDp: any;
    localDateRequiredBobDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private fieldTestServiceClassEntityService: FieldTestServiceClassEntityService,
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
        this.dataUtils.clearInputImage(this.fieldTestServiceClassEntity, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fieldTestServiceClassEntity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldTestServiceClassEntityService.update(this.fieldTestServiceClassEntity));
        } else {
            this.subscribeToSaveResponse(
                this.fieldTestServiceClassEntityService.create(this.fieldTestServiceClassEntity));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldTestServiceClassEntity>) {
        result.subscribe((res: FieldTestServiceClassEntity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldTestServiceClassEntity) {
        this.eventManager.broadcast({ name: 'fieldTestServiceClassEntityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-field-test-service-class-entity-popup',
    template: ''
})
export class FieldTestServiceClassEntityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldTestServiceClassEntityPopupService: FieldTestServiceClassEntityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldTestServiceClassEntityPopupService
                    .open(FieldTestServiceClassEntityDialogComponent as Component, params['id']);
            } else {
                this.fieldTestServiceClassEntityPopupService
                    .open(FieldTestServiceClassEntityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
