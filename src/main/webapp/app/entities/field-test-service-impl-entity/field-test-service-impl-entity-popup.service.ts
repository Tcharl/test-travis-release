import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestServiceImplEntity } from './field-test-service-impl-entity.model';
import { FieldTestServiceImplEntityService } from './field-test-service-impl-entity.service';

@Injectable()
export class FieldTestServiceImplEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestServiceImplEntityService: FieldTestServiceImplEntityService

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
                this.fieldTestServiceImplEntityService.find(id).subscribe((fieldTestServiceImplEntity) => {
                    if (fieldTestServiceImplEntity.localDateMika) {
                        fieldTestServiceImplEntity.localDateMika = {
                            year: fieldTestServiceImplEntity.localDateMika.getFullYear(),
                            month: fieldTestServiceImplEntity.localDateMika.getMonth() + 1,
                            day: fieldTestServiceImplEntity.localDateMika.getDate()
                        };
                    }
                    if (fieldTestServiceImplEntity.localDateRequiredMika) {
                        fieldTestServiceImplEntity.localDateRequiredMika = {
                            year: fieldTestServiceImplEntity.localDateRequiredMika.getFullYear(),
                            month: fieldTestServiceImplEntity.localDateRequiredMika.getMonth() + 1,
                            day: fieldTestServiceImplEntity.localDateRequiredMika.getDate()
                        };
                    }
                    fieldTestServiceImplEntity.instantMika = this.datePipe
                        .transform(fieldTestServiceImplEntity.instantMika, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceImplEntity.instanteRequiredMika = this.datePipe
                        .transform(fieldTestServiceImplEntity.instanteRequiredMika, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceImplEntity.zonedDateTimeMika = this.datePipe
                        .transform(fieldTestServiceImplEntity.zonedDateTimeMika, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceImplEntity.zonedDateTimeRequiredMika = this.datePipe
                        .transform(fieldTestServiceImplEntity.zonedDateTimeRequiredMika, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestServiceImplEntityModalRef(component, fieldTestServiceImplEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestServiceImplEntityModalRef(component, new FieldTestServiceImplEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestServiceImplEntityModalRef(component: Component, fieldTestServiceImplEntity: FieldTestServiceImplEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestServiceImplEntity = fieldTestServiceImplEntity;
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
