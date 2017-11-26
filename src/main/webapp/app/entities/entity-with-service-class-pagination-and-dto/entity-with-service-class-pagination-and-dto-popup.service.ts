import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntityWithServiceClassPaginationAndDTO } from './entity-with-service-class-pagination-and-dto.model';
import { EntityWithServiceClassPaginationAndDTOService } from './entity-with-service-class-pagination-and-dto.service';

@Injectable()
export class EntityWithServiceClassPaginationAndDTOPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private entityWithServiceClassPaginationAndDTOService: EntityWithServiceClassPaginationAndDTOService

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
                this.entityWithServiceClassPaginationAndDTOService.find(id).subscribe((entityWithServiceClassPaginationAndDTO) => {
                    this.ngbModalRef = this.entityWithServiceClassPaginationAndDTOModalRef(component, entityWithServiceClassPaginationAndDTO);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.entityWithServiceClassPaginationAndDTOModalRef(component, new EntityWithServiceClassPaginationAndDTO());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entityWithServiceClassPaginationAndDTOModalRef(component: Component,
        entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTO): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entityWithServiceClassPaginationAndDTO = entityWithServiceClassPaginationAndDTO;
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
