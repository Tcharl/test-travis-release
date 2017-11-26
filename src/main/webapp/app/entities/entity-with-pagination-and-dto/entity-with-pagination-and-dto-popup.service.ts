import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EntityWithPaginationAndDTO } from './entity-with-pagination-and-dto.model';
import { EntityWithPaginationAndDTOService } from './entity-with-pagination-and-dto.service';

@Injectable()
export class EntityWithPaginationAndDTOPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private entityWithPaginationAndDTOService: EntityWithPaginationAndDTOService

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
                this.entityWithPaginationAndDTOService.find(id).subscribe((entityWithPaginationAndDTO) => {
                    this.ngbModalRef = this.entityWithPaginationAndDTOModalRef(component, entityWithPaginationAndDTO);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.entityWithPaginationAndDTOModalRef(component, new EntityWithPaginationAndDTO());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entityWithPaginationAndDTOModalRef(component: Component, entityWithPaginationAndDTO: EntityWithPaginationAndDTO): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.entityWithPaginationAndDTO = entityWithPaginationAndDTO;
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
