import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithPaginationAndDTO } from './entity-with-pagination-and-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithPaginationAndDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-pagination-and-dtos';

    constructor(private http: Http) { }

    create(entityWithPaginationAndDTO: EntityWithPaginationAndDTO): Observable<EntityWithPaginationAndDTO> {
        const copy = this.convert(entityWithPaginationAndDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithPaginationAndDTO: EntityWithPaginationAndDTO): Observable<EntityWithPaginationAndDTO> {
        const copy = this.convert(entityWithPaginationAndDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithPaginationAndDTO> {
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
     * Convert a returned JSON object to EntityWithPaginationAndDTO.
     */
    private convertItemFromServer(json: any): EntityWithPaginationAndDTO {
        const entity: EntityWithPaginationAndDTO = Object.assign(new EntityWithPaginationAndDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithPaginationAndDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithPaginationAndDTO: EntityWithPaginationAndDTO): EntityWithPaginationAndDTO {
        const copy: EntityWithPaginationAndDTO = Object.assign({}, entityWithPaginationAndDTO);
        return copy;
    }
}
