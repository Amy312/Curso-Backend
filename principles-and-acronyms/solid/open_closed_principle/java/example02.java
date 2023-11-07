import java.util.*;
import java.lang.*;
import java.io.*;

class Pokemon  {
	private String name;
	public Pokemon(String name) {
		this.name = name;
	}
	
	public String getName() {
		return this.name;
	}
	
}

class Pokeball {
    private Pokemon pokemon;

    public Pokeball(Pokemon pokemon) {
        this.pokemon = pokemon;
    }

    public void catchAction() {
        System.out.println(this.pokemon.getName() + " fue atrapado");
    }
}


class Principal
{
	public static void main (String [] args)
	{
        //Pokemon pikachu = new Pokemon("pika");
		// Polimorfismo
		Pokemon pika = new Pokemon("Pikachu");
		// pikachu.catchPokemon();
		Pokeball pokeball = new Pokeball(pika);
		pokeball.catchAction();
	
		
	}
}