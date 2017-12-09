import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestPaginationEntity } from './field-test-pagination-entity.model';
import { FieldTestPaginationEntityService } from './field-test-pagination-entity.service';

@Injectable()
export class FieldTestPaginationEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestPaginationEntityService: FieldTestPaginationEntityService

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
                this.fieldTestPaginationEntityService.find(id).subscribe((fieldTestPaginationEntity) => {
                    if (fieldTestPaginationEntity.localDateAlice) {
                        fieldTestPaginationEntity.localDateAlice = {
                            year: fieldTestPaginationEntity.localDateAlice.getFullYear(),
                            month: fieldTestPaginationEntity.localDateAlice.getMonth() + 1,
                            day: fieldTestPaginationEntity.localDateAlice.getDate()
                        };
                    }
                    if (fieldTestPaginationEntity.localDateRequiredAlice) {
                        fieldTestPaginationEntity.localDateRequiredAlice = {
                            year: fieldTestPaginationEntity.localDateRequiredAlice.getFullYear(),
                            month: fieldTestPaginationEntity.localDateRequiredAlice.getMonth() + 1,
                            day: fieldTestPaginationEntity.localDateRequiredAlice.getDate()
                        };
                    }
                    fieldTestPaginationEntity.instantAlice = this.datePipe
                        .transform(fieldTestPaginationEntity.instantAlice, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPaginationEntity.instanteRequiredAlice = this.datePipe
                        .transform(fieldTestPaginationEntity.instanteRequiredAlice, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPaginationEntity.zonedDateTimeAlice = this.datePipe
                        .transform(fieldTestPaginationEntity.zonedDateTimeAlice, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestPaginationEntity.zonedDateTimeRequiredAlice = this.datePipe
                        .transform(fieldTestPaginationEntity.zonedDateTimeRequiredAlice, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestPaginationEntityModalRef(component, fieldTestPaginationEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestPaginationEntityModalRef(component, new FieldTestPaginationEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestPaginationEntityModalRef(component: Component, fieldTestPaginationEntity: FieldTestPaginationEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestPaginationEntity = fieldTestPaginationEntity;
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
