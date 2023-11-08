class Pokemon  {
	private String name;
    private double escapeP;
	public Pokemon(String name, double escapeP) {
		this.name = name;
        this.escapeP = escapeP;
	}
	
	public String getName() {
		return this.name;
	}
    public double getEscapeProbability(){
        return escapeP;
    }
	
}

class Pokeball {
    public boolean catchPokemon(Pokemon pokemon) {
        System.out.println("Intentas atrapar a " + pokemon.getName());
        return true;
        // Implementación básica para atrapar Pokémon
    }
}

class GreatBall extends Pokeball {
    @Override
    public boolean catchPokemon(Pokemon pokemon) {
        if (pokemon.getEscapeProbability() < 0.5) {
            System.out.println(pokemon.getName() + " fue atrapado con una GreatBall!");
            return true;
        } else {
            System.out.println(pokemon.getName() + " escapó de la GreatBall.");
            return false;
        }
    }
}

class UltraBall extends Pokeball {
    @Override
    public boolean catchPokemon(Pokemon pokemon) {
        if (pokemon.getEscapeProbability() < 0.2) {
            System.out.println(pokemon.getName() + " fue atrapado con una UltraBall!");
            return true;
        } else {
            System.out.println(pokemon.getName() + " escapó de la UltraBall.");
            return false;
        }
    }
}

class Principio
{
	public static void main (String [] args)
	{
        //Pokemon pikachu = new Pokemon("pika");
		// Polimorfismo
		Pokemon pika = new Pokemon("Pik achu", 0.12);
		// pikachu.catchPokemon();
		UltraBall uBall = new UltraBall();
        System.out.println(uBall.catchPokemon(pika));
	
		
	}
}

