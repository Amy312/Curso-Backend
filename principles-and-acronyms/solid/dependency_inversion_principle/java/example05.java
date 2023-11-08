interface PokemonAttack {
    void execute();
}

class Pikachu implements PokemonAttack {
    public void execute() {
        electricAttack();
    }

    private void electricAttack() {
        System.out.println("Pikachu usa Ataque Eléctrico!");
    }
}

class Charmander implements PokemonAttack {
    public void execute() {
        fireAttack();
        hitAttack();
    }

    private void fireAttack() {
        System.out.println("Charmander usa Lanzallamas!");
    }

    private void hitAttack() {
        System.out.println("Charmander usa Garras!");
    }
}

class PokemonTrainer {
    private PokemonAttack attackStrategy;

    public PokemonTrainer(PokemonAttack attackStrategy) {
        this.attackStrategy = attackStrategy;
    }

    void commandToAttack() {
        attackStrategy.execute();
    }
}


class Principal
{
	public static void main (String [] args)
	{
        Pikachu pikachu = new Pikachu();
        Charmander charmander = new Charmander();
        PokemonTrainer amy = new PokemonTrainer(charmander);
        amy.commandToAttack();
	
		
	}
}