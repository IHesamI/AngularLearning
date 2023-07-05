import { Injectable } from '@angular/core';
import { Housinglocation } from './housinglocation';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  serverurl = 'http://localhost:3000/locations';
  constructor() { }
  async getAllHousingLocations(): Promise<Housinglocation[]> {
    const data = await fetch(this.serverurl)
    return await data.json() ?? [];
  }


  async getHousingLocationById(id: number): Promise<Housinglocation | undefined> {
    console.log(id);
    const data = await fetch(`${this.serverurl}/${id}`)
    return await data.json() ?? {};
  }
  submitApplication(firstname: string, lastName: string, email: string) {
    console.log(`${firstname},${lastName},${email}`);
  }
}
