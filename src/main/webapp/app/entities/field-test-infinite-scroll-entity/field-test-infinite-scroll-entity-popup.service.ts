import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestInfiniteScrollEntity } from './field-test-infinite-scroll-entity.model';
import { FieldTestInfiniteScrollEntityService } from './field-test-infinite-scroll-entity.service';

@Injectable()
export class FieldTestInfiniteScrollEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestInfiniteScrollEntityService: FieldTestInfiniteScrollEntityService

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
                this.fieldTestInfiniteScrollEntityService.find(id).subscribe((fieldTestInfiniteScrollEntity) => {
                    if (fieldTestInfiniteScrollEntity.localDateHugo) {
                        fieldTestInfiniteScrollEntity.localDateHugo = {
                            year: fieldTestInfiniteScrollEntity.localDateHugo.getFullYear(),
                            month: fieldTestInfiniteScrollEntity.localDateHugo.getMonth() + 1,
                            day: fieldTestInfiniteScrollEntity.localDateHugo.getDate()
                        };
                    }
                    if (fieldTestInfiniteScrollEntity.localDateRequiredHugo) {
                        fieldTestInfiniteScrollEntity.localDateRequiredHugo = {
                            year: fieldTestInfiniteScrollEntity.localDateRequiredHugo.getFullYear(),
                            month: fieldTestInfiniteScrollEntity.localDateRequiredHugo.getMonth() + 1,
                            day: fieldTestInfiniteScrollEntity.localDateRequiredHugo.getDate()
                        };
                    }
                    fieldTestInfiniteScrollEntity.instantHugo = this.datePipe
                        .transform(fieldTestInfiniteScrollEntity.instantHugo, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestInfiniteScrollEntity.instanteRequiredHugo = this.datePipe
                        .transform(fieldTestInfiniteScrollEntity.instanteRequiredHugo, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestInfiniteScrollEntity.zonedDateTimeHugo = this.datePipe
                        .transform(fieldTestInfiniteScrollEntity.zonedDateTimeHugo, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo = this.datePipe
                        .transform(fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestInfiniteScrollEntityModalRef(component, fieldTestInfiniteScrollEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestInfiniteScrollEntityModalRef(component, new FieldTestInfiniteScrollEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestInfiniteScrollEntityModalRef(component: Component, fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestInfiniteScrollEntity = fieldTestInfiniteScrollEntity;
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
