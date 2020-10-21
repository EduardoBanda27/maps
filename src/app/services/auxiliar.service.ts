import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {
  data: [] = []
  constructor() { }

  setParams(key: string, data:any)
	{
        this.data[key] = data;
	}

	getParams(key: string = '')
	{        
        if (key != '')
        {
            var value = this.data[key];
            this.data[key] = null; 
            return value;
        }
        
        var value = this.data;
        this.data = [];
        return value;
	}
  
}
