import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceImplPaginationAndDTO } from './entity-with-service-impl-pagination-and-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceImplPaginationAndDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-pagination-and-dtos';

    constructor(private http: Http) { }

    create(entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTO):
        Observable<EntityWithServiceImplPaginationAndDTO> {
        const copy = this.convert(entityWithServiceImplPaginationAndDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTO):
        Observable<EntityWithServiceImplPaginationAndDTO> {
        const copy = this.convert(entityWithServiceImplPaginationAndDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceImplPaginationAndDTO> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EntityWithServiceImplPaginationAndDTO.
     */
    private convertItemFromServer(json: any): EntityWithServiceImplPaginationAndDTO {
        const entity: EntityWithServiceImplPaginationAndDTO = Object.assign(new EntityWithServiceImplPaginationAndDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceImplPaginationAndDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceImplPaginationAndDTO: EntityWithServiceImplPaginationAndDTO): EntityWithServiceImplPaginationAndDTO {
        const copy: EntityWithServiceImplPaginationAndDTO = Object.assign({}, entityWithServiceImplPaginationAndDTO);
        return copy;
    }
}
