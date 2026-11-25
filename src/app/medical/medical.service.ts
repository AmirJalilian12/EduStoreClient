
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPagination } from '../shared/Models/pagination';
import { IMedicine } from '../shared/Models/medicine';
import { MedicineParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class MedicalService {

  private backendUrl = environment.backendUrl;
  private medicineParams = new MedicineParams();

  constructor(private http: HttpClient) { }

  getMedicineParams() {
    return this.medicineParams;
  }

  updateMedicineParams(params: MedicineParams) {
    this.medicineParams = params;
  }

  getMedicines(): Observable<IPagination<IMedicine>> {
    const params = this.generateMedicineParams();

    return this.http.get<IPagination<IMedicine>>(
      this.backendUrl + '/medicine',
      { params }
    );
  }

  private generateMedicineParams() {
    let params = new HttpParams();

    if (this.medicineParams.search) {
      params = params.append('search', this.medicineParams.search);
    }

    params = params.append('pageIndex', this.medicineParams.pageIndex);
    params = params.append('pageSize', this.medicineParams.pageSize);
    params = params.append('sort', this.medicineParams.sort);
    params = params.append('typeSort', this.medicineParams.typeSort);

    return params;
  }

  getMedicine(id: number): Observable<IMedicine> {
    return this.http.get<IMedicine>(
      `${this.backendUrl}/medicine/${id}`
    );
  }

  resetMedicineParams(): MedicineParams {
    this.medicineParams = new MedicineParams();
    return this.medicineParams;
  }
}
