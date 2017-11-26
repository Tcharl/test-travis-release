import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestMapstructEntity } from './field-test-mapstruct-entity.model';
import { FieldTestMapstructEntityService } from './field-test-mapstruct-entity.service';

@Injectable()
export class FieldTestMapstructEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestMapstructEntityService: FieldTestMapstructEntityService

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
                this.fieldTestMapstructEntityService.find(id).subscribe((fieldTestMapstructEntity) => {
                    if (fieldTestMapstructEntity.localDateEva) {
                        fieldTestMapstructEntity.localDateEva = {
                            year: fieldTestMapstructEntity.localDateEva.getFullYear(),
                            month: fieldTestMapstructEntity.localDateEva.getMonth() + 1,
                            day: fieldTestMapstructEntity.localDateEva.getDate()
                        };
                    }
                    if (fieldTestMapstructEntity.localDateRequiredEva) {
                        fieldTestMapstructEntity.localDateRequiredEva = {
                            year: fieldTestMapstructEntity.localDateRequiredEva.getFullYear(),
                            month: fieldTestMapstructEntity.localDateRequiredEva.getMonth() + 1,
                            day: fieldTestMapstructEntity.localDateRequiredEva.getDate()
                        };
                    }
                    fieldTestMapstructEntity.instantEva = this.datePipe
                        .transform(fieldTestMapstructEntity.instantEva, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestMapstructEntity.instanteRequiredEva = this.datePipe
                        .transform(fieldTestMapstructEntity.instanteRequiredEva, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestMapstructEntity.zonedDateTimeEva = this.datePipe
                        .transform(fieldTestMapstructEntity.zonedDateTimeEva, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestMapstructEntity.zonedDateTimeRequiredEva = this.datePipe
                        .transform(fieldTestMapstructEntity.zonedDateTimeRequiredEva, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestMapstructEntityModalRef(component, fieldTestMapstructEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestMapstructEntityModalRef(component, new FieldTestMapstructEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestMapstructEntityModalRef(component: Component, fieldTestMapstructEntity: FieldTestMapstructEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestMapstructEntity = fieldTestMapstructEntity;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
