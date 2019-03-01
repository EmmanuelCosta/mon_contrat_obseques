import { Injectable } from '@angular/core';
import { HttpClient ,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as models from '../models/models';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable} from 'rxjs';
import { BASE_PATH } from './variable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_HEADER } from './variable';
import { TOKEN } from './variable';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  

    private defaultHeaders: Headers = new Headers();

    constructor(private http: HttpClient) { }
    private basePath: string = BASE_PATH;

    login(credentials: models.LoginCredentials):Observable<models.ApiAccess> {
    
        let requestOptions: Object = {
            /* other options here */
            responseType: 'text',
            observe: 'response'
          }
          const jwtHelper = new JwtHelperService();


        return this.http.post<HttpResponse<Object>>(this.basePath+"/login",credentials,
            requestOptions)
            .pipe(map((response: Response)  => {
                
                console.log("resp = " + response);
                console.log("resp = " +  response.headers.get(TOKEN_HEADER));

                var encodeToken = response.headers.get(TOKEN_HEADER);
                    encodeToken = encodeToken.replace(TOKEN, "");
                    var token = jwtHelper.decodeToken(encodeToken)
                    token.encodeToken = encodeToken;

                return token;
            }));
    }

    logout() {
      
    }

    public acceptCGU(credentials: models.LoginCredentials): Observable<string> {
        let requestOptions: Object = {
            /* other options here */
            responseType: 'text',
            observe: 'response'
          }
          const jwtHelper = new JwtHelperService();


        return this.http.post<HttpResponse<Object>>(this.basePath+"/login/acceptCGU",credentials,
            requestOptions)
            .pipe(map((response: Response)  => {     
             
               return 'ok';
            }));
    }


   

   
}