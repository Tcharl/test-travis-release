import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestEntity } from './field-test-entity.model';
import { FieldTestEntityService } from './field-test-entity.service';

@Injectable()
export class FieldTestEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestEntityService: FieldTestEntityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.fieldTestEntityService.find(id).subscribe((fieldTestEntity) => {
                    if (fieldTestEntity.localDateTom) {
                        fieldTestEntity.localDateTom = {
                            year: fieldTestEntity.localDateTom.getFullYear(),
                            month: fieldTestEntity.localDateTom.getMonth() + 1,
                            day: fieldTestEntity.localDateTom.getDate()
                        };
                    }
                    if (fieldTestEntity.localDateRequiredTom) {
                        fieldTestEntity.localDateRequiredTom = {
                            year: fieldTestEntity.localDateRequiredTom.getFullYear(),
                            month: fieldTestEntity.localDateRequiredTom.getMonth() + 1,
                            day: fieldTestEntity.localDateRequiredTom.getDate()
                        };
                    }
                    fieldTestEntity.instantTom = this.datePipe
                        .transform(fieldTestEntity.instantTom, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestEntity.instanteRequiredTom = this.datePipe
                        .transform(fieldTestEntity.instanteRequiredTom, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestEntity.zonedDateTimeTom = this.datePipe
                        .transform(fieldTestEntity.zonedDateTimeTom, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestEntity.zonedDateTimeRequiredTom = this.datePipe
                        .transform(fieldTestEntity.zonedDateTimeRequiredTom, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestEntityModalRef(component, fieldTestEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestEntityModalRef(component, new FieldTestEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestEntityModalRef(component: Component, fieldTestEntity: FieldTestEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestEntity = fieldTestEntity;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
