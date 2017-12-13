import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestPagerEntity } from './field-test-pager-entity.model';
import { FieldTestPagerEntityService } from './field-test-pager-entity.service';

@Injectable()
export class FieldTestPagerEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestPagerEntityService: FieldTestPagerEntityService

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
                this.fieldTestPagerEntityService.find(id).subscribe((fieldTestPagerEntity) => {
                    if (fieldTestPagerEntity.localDateJade) {
                        fieldTestPagerEntity.localDateJade = {
                            year: fieldTestPagerEntity.localDateJade.getFullYear(),
                            month: fieldTestPagerEntity.localDateJade.getMonth() + 1,
                            day: fieldTestPagerEntity.localDateJade.getDate()
                        };
                    }
                    if (fieldTestPagerEntity.localDateRequiredJade) {
                        fieldTestPagerEntity.localDateRequiredJade = {
                            year: fieldTestPagerEntity.localDateRequiredJade.getFullYear(),
                            month: fieldTestPagerEntity.localDateRequiredJade.getMonth() + 1,
                            day: fieldTestPagerEntity.localDateRequiredJade.getDate()
                        };
                    }
                    fieldTestPagerEntity.instantJade = this.datePipe
                        .transform(fieldTestPagerEntity.instantJade, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPagerEntity.instanteRequiredJade = this.datePipe
                        .transform(fieldTestPagerEntity.instanteRequiredJade, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPagerEntity.zonedDateTimeJade = this.datePipe
                        .transform(fieldTestPagerEntity.zonedDateTimeJade, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPagerEntity.zonedDateTimeRequiredJade = this.datePipe
                        .transform(fieldTestPagerEntity.zonedDateTimeRequiredJade, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestPagerEntityModalRef(component, fieldTestPagerEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestPagerEntityModalRef(component, new FieldTestPagerEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestPagerEntityModalRef(component: Component, fieldTestPagerEntity: FieldTestPagerEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestPagerEntity = fieldTestPagerEntity;
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
