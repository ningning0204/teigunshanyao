import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
    HttpHeaders,
    HttpClient,
    HttpErrorResponse
} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }


    /**
     * GET request processing (usually used to get data)
     * @param url backend interface api For example: /api/test/6
     */
    public get(url: string): Observable<any> {
        return this.http.get(`${url}`, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }


    /**
     * POST request processing (usually used to save data)
     * @param url backend interface api 
     * @param data parameters
     */
    public post(url: string, data = {}): Observable<any> {
        return this.http.post(`${url}`, data, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }


    /**
     * PUT request processing (usually used to update data)
     * @param url backend interface api For example: /api/test/6
     * @param data parameters
     */
    public put(url: string, data = {}): Observable<any> {
        return this.http.put(url, data, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }


    /**
     * DELETE request processing (usually used to delete data)
     * @param url backend interface api For example: /api/test/6
     */
    public delete(url: string): Observable<{}> {
        return this.http.delete(url, httpOptions).pipe(
            map(this.extractData),
            catchError(this.handleError)
        );
    }


    /**
     * Extract data
     * @param res return data
     */
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }


    /**
     * Error handle
     * @param error
     */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        return throwError('Something bad happened; please try again later.');
    }
}
