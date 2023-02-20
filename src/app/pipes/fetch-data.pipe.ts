import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'fetchData',
    pure: false
})
export class FetchDataPipe implements PipeTransform {

    constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }
    fetchUrl = ''
    fetchData: any
    subscription!: Subscription


    transform(url: string): any {

        if (url !== this.fetchUrl) {
            this.fetchData = null
            this.fetchUrl = url
            this.subscription = this.http.get<any>(url).subscribe(data => {
                this.cd.markForCheck()
                this.fetchData = data
            })
        }

        return this.fetchData;
    }


    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

}
