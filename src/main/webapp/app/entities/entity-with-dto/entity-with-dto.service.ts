import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { EntityWithDTO } from './entity-with-dto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EntityWithDTOService {

    private resourceUrl = SERVER_API_URL + 'api/entity-with-dtos';

    constructor(private http: Http) { }

    create(entityWithDTO: EntityWithDTO): Observable<EntityWithDTO> {
        const copy = this.convert(entityWithDTO);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(entityWithDTO: EntityWithDTO): Observable<EntityWithDTO> {
        const copy = this.convert(entityWithDTO);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EntityWithDTO> {
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
     * Convert a returned JSON object to EntityWithDTO.
     */
    private convertItemFromServer(json: any): EntityWithDTO {
        const entity: EntityWithDTO = Object.assign(new EntityWithDTO(), json);
        return entity;
    }

    /**
     * Convert a EntityWithDTO to a JSON which can be sent to the server.
     */
    private convert(entityWithDTO: EntityWithDTO): EntityWithDTO {
        const copy: EntityWithDTO = Object.assign({}, entityWithDTO);
        return copy;
    }
}
