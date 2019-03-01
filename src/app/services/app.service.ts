import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as models from '../models/models';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { BASE_PATH } from './variable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_HEADER } from './variable';
import { TOKEN } from './variable';
import * as FileSaver from 'file-saver';
import Common from '../utils/Common'


@Injectable({ providedIn: 'root' })
export class AppService {



    private defaultHeaders: Headers = new Headers();

    constructor(private http: HttpClient,
        private http2: Http) { }
    private basePath: string = BASE_PATH;

    getContract(): Observable<models.Contract> {

        let requestOptions: Object = {
            /* other options here */

            observe: 'response'
        }
        const jwtHelper = new JwtHelperService();


        return this.http.post<HttpResponse<Object>>(this.basePath + "/api/mobile/user/contract",
            requestOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    getEnsure(): Observable<models.Ensure> {

        let requestOptions: Object = {
            /* other options here */

            observe: 'response'
        }


        return this.http.post<HttpResponse<Object>>(this.basePath + "/api/mobile/user/ensure",
            requestOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    getFhome(): Observable<models.FuneralHome> {

        let requestOptions: Object = {
            /* other options here */

            observe: 'response'
        }


        return this.http.post<HttpResponse<Object>>(this.basePath + "/api/funeralHome/",
            requestOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    logout() {

    }

    downloadFile(templateType: number, code: string): Observable<models.OrtDocument> {

        let httpHeaders = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Accept', 'application/json');

        let headers = new Headers(this.defaultHeaders.toJSON());

        let queryParameters = new URLSearchParams();
        headers.set('Content-Type', 'application/json');
        queryParameters.set('typeCode', templateType.toString());
        queryParameters.set('code', code);

        let httpParams = new HttpParams().append('typeCode', templateType.toString()).append('code', code);
        let requestOptions: Object = {
            /* other options here */



            observe: 'response'
        }


        //+"?typeCode="+templateType+"&code="+code
        return this.http.post(this.basePath + "/api/download" + "?typeCode=" + templateType + "&code=" + code,
            { headers: headers, responseType: 'blob' as 'json' })

            .pipe(map((response: Response) => {
                console.log("tttttttttttttttttttttt")


                var ortDoc = new models.OrtDocument();
                //  ortDoc.blob = new Blob([response.blob()], { type: 'application/pdf' });
                //    ortDoc.name = filename;
                return ortDoc;
            }));
    }



    public downloadResource(templateType: number, code: string) {
        var c = new Common();
        let currentUser = localStorage.getItem(c.getTokenName());
        let httpHeaders = new Headers().set('Authorization', `Bearer ${currentUser}`)
        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON());


        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${currentUser}`)
        queryParameters.set('typeCode', templateType.toString());
        queryParameters.set('code', code);

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            responseType: ResponseContentType.Blob,
            //body: url == null ? '' : JSON.stringify(url), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        return this.http2.request(this.basePath + "/api/download", requestOptions)

    }


    public downloadCGU() {
        var c = new Common();
        let currentUser = localStorage.getItem(c.getTokenName());
        let httpHeaders = new Headers().set('Authorization', `Bearer ${currentUser}`)
        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON());


        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer ${currentUser}`)


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            responseType: ResponseContentType.Blob,
            //body: url == null ? '' : JSON.stringify(url), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        return this.http2.request(this.basePath + "/downloadCGU", requestOptions)

    }
    public saveFile(blob?: Blob, filename?: string): void {
        FileSaver.saveAs(blob, filename);
    }



    sendTo(email: string): Observable<string> {

        let requestOptions: Object = {
            /* other options here */

            observe: 'response'
        }


        return this.http.post<HttpResponse<Object>>(this.basePath + "/api/mobile/email/infos" + "?sendTo=" + email,
            requestOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    getRevalo(): Observable<number> {

        let requestOptions: Object = {
            /* other options here */

            observe: 'response'
        }


        return this.http.post<HttpResponse<Object>>(this.basePath + "/api/mobile/revalo",
            requestOptions)
            .pipe(map((response: Response) => {
                return response;
            }));
    }

    changePassword(credentials: models.LoginCredentials):Observable<string> {
    
        let requestOptions: Object = {
            /* other options here */
            responseType: 'text',
            observe: 'response'
          }


        return this.http.post<HttpResponse<Object>>(this.basePath+"/login/new",credentials,
            requestOptions)
            .pipe(map((response: Response)  => {
                return "done";
            }));
    }


}