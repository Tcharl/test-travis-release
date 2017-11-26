import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BankAccountService {

    private resourceUrl = SERVER_API_URL + 'api/bank-accounts';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(bankAccount: BankAccount): Observable<BankAccount> {
        const copy = this.convert(bankAccount);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(bankAccount: BankAccount): Observable<BankAccount> {
        const copy = this.convert(bankAccount);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BankAccount> {
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
     * Convert a returned JSON object to BankAccount.
     */
    private convertItemFromServer(json: any): BankAccount {
        const entity: BankAccount = Object.assign(new BankAccount(), json);
        entity.openingDay = this.dateUtils
            .convertLocalDateFromServer(json.openingDay);
        entity.lastOperationDate = this.dateUtils
            .convertDateTimeFromServer(json.lastOperationDate);
        return entity;
    }

    /**
     * Convert a BankAccount to a JSON which can be sent to the server.
     */
    private convert(bankAccount: BankAccount): BankAccount {
        const copy: BankAccount = Object.assign({}, bankAccount);
        copy.openingDay = this.dateUtils
            .convertLocalDateToServer(bankAccount.openingDay);

        copy.lastOperationDate = this.dateUtils.toDate(bankAccount.lastOperationDate);
        return copy;
    }
}
