import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import data from "../../../../assets/data/hanhchinhvietnam/all-with-tree.json";

@Injectable({
    providedIn: 'root',
})

export class CountryService {

    constructor(private http: HttpClient) {
        // this.getVietNameLocation().subscribe(data => {
        //     console.log(data);
        // });

        // const aaaa = {
        //     ...cities,
        //     districts: ['test']
        // }

        // console.log(data);


    }

    getVietNamLocation(): Observable<any> {
        return this.http.get("../../../../assets/data/hanhchinhvietnam/all-with-tree.json");
    }
}