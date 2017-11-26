import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestPaginationEntity } from './field-test-pagination-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestPaginationEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-pagination-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestPaginationEntity: FieldTestPaginationEntity): Observable<FieldTestPaginationEntity> {
        const copy = this.convert(fieldTestPaginationEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestPaginationEntity: FieldTestPaginationEntity): Observable<FieldTestPaginationEntity> {
        const copy = this.convert(fieldTestPaginationEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestPaginationEntity> {
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
     * Convert a returned JSON object to FieldTestPaginationEntity.
     */
    private convertItemFromServer(json: any): FieldTestPaginationEntity {
        const entity: FieldTestPaginationEntity = Object.assign(new FieldTestPaginationEntity(), json);
        entity.localDateAlice = this.dateUtils
            .convertLocalDateFromServer(json.localDateAlice);
        entity.localDateRequiredAlice = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredAlice);
        entity.instantAlice = this.dateUtils
            .convertDateTimeFromServer(json.instantAlice);
        entity.instanteRequiredAlice = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredAlice);
        entity.zonedDateTimeAlice = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeAlice);
        entity.zonedDateTimeRequiredAlice = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredAlice);
        return entity;
    }

    /**
     * Convert a FieldTestPaginationEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestPaginationEntity: FieldTestPaginationEntity): FieldTestPaginationEntity {
        const copy: FieldTestPaginationEntity = Object.assign({}, fieldTestPaginationEntity);
        copy.localDateAlice = this.dateUtils
            .convertLocalDateToServer(fieldTestPaginationEntity.localDateAlice);
        copy.localDateRequiredAlice = this.dateUtils
            .convertLocalDateToServer(fieldTestPaginationEntity.localDateRequiredAlice);

        copy.instantAlice = this.dateUtils.toDate(fieldTestPaginationEntity.instantAlice);

        copy.instanteRequiredAlice = this.dateUtils.toDate(fieldTestPaginationEntity.instanteRequiredAlice);

        copy.zonedDateTimeAlice = this.dateUtils.toDate(fieldTestPaginationEntity.zonedDateTimeAlice);

        copy.zonedDateTimeRequiredAlice = this.dateUtils.toDate(fieldTestPaginationEntity.zonedDateTimeRequiredAlice);
        return copy;
    }
}
