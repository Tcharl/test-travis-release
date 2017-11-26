import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FieldTestServiceImplEntity } from './field-test-service-impl-entity.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FieldTestServiceImplEntityService {

    private resourceUrl = SERVER_API_URL + 'api/field-test-service-impl-entities';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(fieldTestServiceImplEntity: FieldTestServiceImplEntity): Observable<FieldTestServiceImplEntity> {
        const copy = this.convert(fieldTestServiceImplEntity);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fieldTestServiceImplEntity: FieldTestServiceImplEntity): Observable<FieldTestServiceImplEntity> {
        const copy = this.convert(fieldTestServiceImplEntity);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FieldTestServiceImplEntity> {
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
     * Convert a returned JSON object to FieldTestServiceImplEntity.
     */
    private convertItemFromServer(json: any): FieldTestServiceImplEntity {
        const entity: FieldTestServiceImplEntity = Object.assign(new FieldTestServiceImplEntity(), json);
        entity.localDateMika = this.dateUtils
            .convertLocalDateFromServer(json.localDateMika);
        entity.localDateRequiredMika = this.dateUtils
            .convertLocalDateFromServer(json.localDateRequiredMika);
        entity.instantMika = this.dateUtils
            .convertDateTimeFromServer(json.instantMika);
        entity.instanteRequiredMika = this.dateUtils
            .convertDateTimeFromServer(json.instanteRequiredMika);
        entity.zonedDateTimeMika = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeMika);
        entity.zonedDateTimeRequiredMika = this.dateUtils
            .convertDateTimeFromServer(json.zonedDateTimeRequiredMika);
        return entity;
    }

    /**
     * Convert a FieldTestServiceImplEntity to a JSON which can be sent to the server.
     */
    private convert(fieldTestServiceImplEntity: FieldTestServiceImplEntity): FieldTestServiceImplEntity {
        const copy: FieldTestServiceImplEntity = Object.assign({}, fieldTestServiceImplEntity);
        copy.localDateMika = this.dateUtils
            .convertLocalDateToServer(fieldTestServiceImplEntity.localDateMika);
        copy.localDateRequiredMika = this.dateUtils
            .convertLocalDateToServer(fieldTestServiceImplEntity.localDateRequiredMika);

        copy.instantMika = this.dateUtils.toDate(fieldTestServiceImplEntity.instantMika);

        copy.instanteRequiredMika = this.dateUtils.toDate(fieldTestServiceImplEntity.instanteRequiredMika);

        copy.zonedDateTimeMika = this.dateUtils.toDate(fieldTestServiceImplEntity.zonedDateTimeMika);

        copy.zonedDateTimeRequiredMika = this.dateUtils.toDate(fieldTestServiceImplEntity.zonedDateTimeRequiredMika);
        return copy;
    }
}
