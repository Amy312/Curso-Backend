class Pokemon {
    private String name;
    private String type;
    // Constructor, getters y setters
}

interface Attacker {
    void attack();
}

interface Healer {
    void heal();
}

interface Flyer {
    void fly();
}

interface Swimmer {
    void swim();
}

class Pikachu implements Attacker {
    public void attack() {
        System.out.println("Pikachu usa Impactrueno!");
    }
}

class Blissey implements Healer {
	public void heal() {
        System.out.println("Blissey esta curando!");
    }
}

class Charizard implements Attacker, Flyer {
	public void  attack(){
		System.out.println("Charizard esta usando meteoro!");
	}
	
	public void fly() {
		System.out.println("Charizard esta volando!");
	}
}
class Lapras implements Swimmer, Attacker {
    public void swim() {
        System.out.println("Lapras nada tranquilamente!");
    }

    public void attack() {
        System.out.println("Lapras usa Hidrobomba!");
    }
}

class Principal {
	public static void main(String [] args) {
		Lapras lapra = new Lapras();
		lapra.swim();
		Charizard chari = new Charizard();
		chari.fly();
        chari.attack();
	}
}