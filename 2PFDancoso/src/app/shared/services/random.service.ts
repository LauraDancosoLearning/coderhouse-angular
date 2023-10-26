import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {
  
  names = ['Pepe', 'Jose', 'Juan', 'Carlos', 'Eliseo'];

  constructor() {
   }

   getRandomName(): Promise<string>{
    return new Promise<string>((resolve)=>{
      setTimeout(() => {
        resolve(this.names[this.getRandomInt(this.names.length)])
      }, 200);
    })
   }
  
   private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  
}
