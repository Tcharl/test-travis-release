import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestInfiniteScrollEntity } from './field-test-infinite-scroll-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestInfiniteScrollEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-infinite-scroll-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntity): Observable<FieldTestInfiniteScrollEntity> {
        const copy = this.convert(fieldTestInfiniteScrollEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntity): Observable<FieldTestInfiniteScrollEntity> {
        const copy = this.convert(fieldTestInfiniteScrollEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestInfiniteScrollEntity> {
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
     * Convert a returned JSON object to FieldTestInfiniteScrollEntity.
     */
    private convertItemFromServer(json: any): FieldTestInfiniteScrollEntity {
        const entity: FieldTestInfiniteScrollEntity = Object.assign(new FieldTestInfiniteScrollEntity(), json);
        entity.localDateHugo = this.dateUtils
            .convertLocalDateFromServer(json.localDateHugo);
        entity.localDateRequiredHugo = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredHugo);
        entity.instantHugo = this.dateUtils
            .convertDateTimeFromServer(json.instantHugo);
        entity.instanteRequiredHugo = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredHugo);
        entity.zonedDateTimeHugo = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeHugo);
        entity.zonedDateTimeRequiredHugo = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredHugo);
        return entity;
    }

    /**
     * Convert a FieldTestInfiniteScrollEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestInfiniteScrollEntity: FieldTestInfiniteScrollEntity): FieldTestInfiniteScrollEntity {
        const copy: FieldTestInfiniteScrollEntity = Object.assign({}, fieldTestInfiniteScrollEntity);
        copy.localDateHugo = this.dateUtils
            .convertLocalDateToServer(fieldTestInfiniteScrollEntity.localDateHugo);
        copy.localDateRequiredHugo = this.dateUtils
            .convertLocalDateToServer(fieldTestInfiniteScrollEntity.localDateRequiredHugo);

        copy.instantHugo = this.dateUtils.toDate(fieldTestInfiniteScrollEntity.instantHugo);

        copy.instanteRequiredHugo = this.dateUtils.toDate(fieldTestInfiniteScrollEntity.instanteRequiredHugo);

        copy.zonedDateTimeHugo = this.dateUtils.toDate(fieldTestInfiniteScrollEntity.zonedDateTimeHugo);

        copy.zonedDateTimeRequiredHugo = this.dateUtils.toDate(fieldTestInfiniteScrollEntity.zonedDateTimeRequiredHugo);
        return copy;
    }
}
