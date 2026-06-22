import { Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/pokemon';

  //State management for the data with signals.
  pokemonList = signal<any[]>([]);

  fetchPokemon() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.pokemonList.set(data));
  }

  //This is used to send data to the database.
savePokemon(data:any) {
  return this.http.post(this.apiUrl, data);
  }
}