import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntityWithServiceClassAndPagination } from './entity-with-service-class-and-pagination.model';
import { EntityWithServiceClassAndPaginationService } from './entity-with-service-class-and-pagination.service';

@Injectable()
export class EntityWithServiceClassAndPaginationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private entityWithServiceClassAndPaginationService: EntityWithServiceClassAndPaginationService

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
                this.entityWithServiceClassAndPaginationService.find(id).subscribe((entityWithServiceClassAndPagination) => {
                    this.ngbModalRef = this.entityWithServiceClassAndPaginationModalRef(component, entityWithServiceClassAndPagination);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.entityWithServiceClassAndPaginationModalRef(component, new EntityWithServiceClassAndPagination());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entityWithServiceClassAndPaginationModalRef(component: Component,
        entityWithServiceClassAndPagination: EntityWithServiceClassAndPagination): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entityWithServiceClassAndPagination = entityWithServiceClassAndPagination;
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
