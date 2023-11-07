package task;

abstract class Teleferico {
    private String firstSchedule;
    private String lastSchedule;
    private String name;
    private int stop;

    public Teleferico(String firstSchedule, String lastSchedule, String name, int stop){
        this.firstSchedule = firstSchedule;
        this.lastSchedule = lastSchedule;
        this.name = name;
        this.stop = stop;
    }

    public String getFirstSchedule(){
        return this.firstSchedule;
    }
    
    public String getLastSchedule(){
        return this.lastSchedule;
    }

    public String getName(){
        return this.name;
    }
    public abstract void startTrip();
    public abstract void stopTrip();
    public abstract void finishTrip();
}

class Roja extends Teleferico{

    public Roja(String firstSchedule, String lastSchedule, int stop) {
        super(firstSchedule, lastSchedule, "roja", stop);
    }

    public void startTrip() {
        System.out.println("La linea " + getName() +  " empezo su recorrido a las: " + getFirstSchedule());
    }

    public void stopTrip() {
        System.out.println("La linea " + getName() + " se detuvo repentinamente O-O!");
    }

    public void finishTrip() {
        System.out.println("La linea " + getName() +  " finalizó su recorrido a las: " + getLastSchedule());

    }
}

class Azul extends Teleferico{

    public Azul(String firstSchedule, String lastSchedule, int stop) {
        super(firstSchedule, lastSchedule, "azul", stop);
    }

    public void startTrip() {
        System.out.println("La linea " + getName() +  " empezo su recorrido a las: " + getFirstSchedule());
    }

    public void stopTrip() {
        System.out.println("La linea " + getName() + " se detuvo repentinamente O-O!");
    }

    public void finishTrip() {
        System.out.println("La linea " + getName() +  " finalizó su recorrido a las: " + getLastSchedule());

    }
}

class Linea {
    private Teleferico teleferico;

    public Linea(Teleferico linea){
        this.teleferico = linea;
    }

    public void startTrip(){
        teleferico.startTrip();
    }

    public void stopTrip(){
        teleferico.stopTrip();
    }
    
    public void finishTrip(){
        teleferico.finishTrip();
    }
}

class Dorada extends Teleferico{

    public Dorada(String firstSchedule, String lastSchedule, int stop) {
        super(firstSchedule, lastSchedule, "dorada", stop);
    }

    public void startTrip() {
        System.out.println("La linea " + getName() +  " empezo su recorrido a las: " + getFirstSchedule());
    }

    public void stopTrip() {
        System.out.println("La linea " + getName() + " se detuvo repentinamente O-O!");
    }

    public void finishTrip() {
        System.out.println("La linea " + getName() +  " finalizó su recorrido a las: " + getLastSchedule());

    }
}

class Central {
	public static void main(String [] args) {
		Roja rojaParada1 = new Roja("06:30", "22:00", 1);
        Azul azulParada1 = new Azul("05:00", "21:30", 1);
    
        Linea lineaR1 = new Linea(rojaParada1);
        lineaR1.startTrip();
        lineaR1.stopTrip();

        Linea lineaA1 = new Linea(azulParada1);
        lineaA1.startTrip();
        lineaA1.finishTrip();

        Dorada doradaParada2 = new Dorada("10:00", "23:00", 2);

        Linea lineaD2 = new Linea(doradaParada2);
        lineaD2.startTrip();
        lineaD2.stopTrip();
        lineaR1.finishTrip();
	}
}