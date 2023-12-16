import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred.';
        
        if (error.error instanceof HttpErrorResponse && error.error.status === 0) {
          // Client-side error
          errorMessage = `${error.error.message}`;
        } else {
          // Server-side error
          if (error.status === 401) {
            // Handle unauthorized (e.g., redirect to login)
          }
          errorMessage = `Server Error: ${error.error.message}`;
          if (error.status === 400) {
            // Handle unauthorized (e.g., redirect to login)
          }
          errorMessage = `Server Error: ${error.error.message}`;
        }

        console.error(errorMessage); // Log the error in the console
        return throwError(errorMessage);
      })
    );
  }
}
