import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceClassPaginationAndDTO } from './entity-with-service-class-pagination-and-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceClassPaginationAndDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-class-pagination-and-dtos';

    constructor(private http: Http) { }

    create(entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTO):
        Observable<EntityWithServiceClassPaginationAndDTO> {
        const copy = this.convert(entityWithServiceClassPaginationAndDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTO):
        Observable<EntityWithServiceClassPaginationAndDTO> {
        const copy = this.convert(entityWithServiceClassPaginationAndDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceClassPaginationAndDTO> {
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
     * Convert a returned JSON object to EntityWithServiceClassPaginationAndDTO.
     */
    private convertItemFromServer(json: any): EntityWithServiceClassPaginationAndDTO {
        const entity: EntityWithServiceClassPaginationAndDTO = Object.assign(new EntityWithServiceClassPaginationAndDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceClassPaginationAndDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceClassPaginationAndDTO: EntityWithServiceClassPaginationAndDTO): EntityWithServiceClassPaginationAndDTO {
        const copy: EntityWithServiceClassPaginationAndDTO = Object.assign({}, entityWithServiceClassPaginationAndDTO);
        return copy;
    }
}
