import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithServiceImplAndDTO } from './entity-with-service-impl-and-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithServiceImplAndDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-service-impl-and-dtos';

    constructor(private http: Http) { }

    create(entityWithServiceImplAndDTO: EntityWithServiceImplAndDTO): Observable<EntityWithServiceImplAndDTO> {
        const copy = this.convert(entityWithServiceImplAndDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithServiceImplAndDTO: EntityWithServiceImplAndDTO): Observable<EntityWithServiceImplAndDTO> {
        const copy = this.convert(entityWithServiceImplAndDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithServiceImplAndDTO> {
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
     * Convert a returned JSON object to EntityWithServiceImplAndDTO.
     */
    private convertItemFromServer(json: any): EntityWithServiceImplAndDTO {
        const entity: EntityWithServiceImplAndDTO = Object.assign(new EntityWithServiceImplAndDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithServiceImplAndDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithServiceImplAndDTO: EntityWithServiceImplAndDTO): EntityWithServiceImplAndDTO {
        const copy: EntityWithServiceImplAndDTO = Object.assign({}, entityWithServiceImplAndDTO);
        return copy;
    }
}
