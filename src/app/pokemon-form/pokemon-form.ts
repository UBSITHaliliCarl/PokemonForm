import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonService } from '../pokemon-service';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.html',
  styleUrl: './pokemon-form.css',
})
export class PokemonForm {
  private formBuilder = inject(FormBuilder);
  pokemonService = inject(PokemonService);

  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required],
  })

  //Submit method for the form.
  onSubmit(){
    if(this.pokemonForm.valid) {
      this.pokemonService.savePokemon
      (this.pokemonForm.getRawValue()).subscribe(() => {
        this.pokemonService.fetchPokemon(); //Fetches from the database
        this.pokemonForm.reset();
      })
    }
  }
}
