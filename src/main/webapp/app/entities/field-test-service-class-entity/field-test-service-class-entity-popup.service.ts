import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FieldTestServiceClassEntity } from './field-test-service-class-entity.model';
import { FieldTestServiceClassEntityService } from './field-test-service-class-entity.service';

@Injectable()
export class FieldTestServiceClassEntityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private fieldTestServiceClassEntityService: FieldTestServiceClassEntityService

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
                this.fieldTestServiceClassEntityService.find(id).subscribe((fieldTestServiceClassEntity) => {
                    if (fieldTestServiceClassEntity.localDateBob) {
                        fieldTestServiceClassEntity.localDateBob = {
                            year: fieldTestServiceClassEntity.localDateBob.getFullYear(),
                            month: fieldTestServiceClassEntity.localDateBob.getMonth() + 1,
                            day: fieldTestServiceClassEntity.localDateBob.getDate()
                        };
                    }
                    if (fieldTestServiceClassEntity.localDateRequiredBob) {
                        fieldTestServiceClassEntity.localDateRequiredBob = {
                            year: fieldTestServiceClassEntity.localDateRequiredBob.getFullYear(),
                            month: fieldTestServiceClassEntity.localDateRequiredBob.getMonth() + 1,
                            day: fieldTestServiceClassEntity.localDateRequiredBob.getDate()
                        };
                    }
                    fieldTestServiceClassEntity.instantBob = this.datePipe
                        .transform(fieldTestServiceClassEntity.instantBob, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceClassEntity.instanteRequiredBob = this.datePipe
                        .transform(fieldTestServiceClassEntity.instanteRequiredBob, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceClassEntity.zonedDateTimeBob = this.datePipe
                        .transform(fieldTestServiceClassEntity.zonedDateTimeBob, 'yyyy-MM-ddTHH:mm:ss');
                    fieldTestServiceClassEntity.zonedDateTimeRequiredBob = this.datePipe
                        .transform(fieldTestServiceClassEntity.zonedDateTimeRequiredBob, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.fieldTestServiceClassEntityModalRef(component, fieldTestServiceClassEntity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.fieldTestServiceClassEntityModalRef(component, new FieldTestServiceClassEntity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    fieldTestServiceClassEntityModalRef(component: Component, fieldTestServiceClassEntity: FieldTestServiceClassEntity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fieldTestServiceClassEntity = fieldTestServiceClassEntity;
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
