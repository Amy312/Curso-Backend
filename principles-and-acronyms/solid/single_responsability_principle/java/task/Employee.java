package task;
public class Employee {
    private String name;
    private String job;   
    
    public Employee(String name, String job){
        this.name = name;
        this.job = job;
    }

    public String getName(){
        return name;
    }
}

interface MovieProjector{
    void startProjection();
    void stopProjection();
    void checkProjectionStatus();
}


interface TicketSeller{
    void sellTicket();
    void refundTicket();
    void checkTicketAvailability();
}


interface ConcessionStandWorker{
    void serveSnack();
    void restockItems();
    void processPayment();
}

class MovieWorker extends Employee implements MovieProjector{
    

    public MovieWorker(String name) {
        super(name, "movie worker");
    }

    public void startProjection() {
        System.out.println(getName() + " esta colocando la película :D");
    }

    public void stopProjection() {
        System.out.println(getName() + " detuvo la película :O");
    }

    public void checkProjectionStatus() {
        System.out.println(getName() + " esta revisando el estado la película :p");
    }
}


class TicketWorker extends Employee implements TicketSeller{
    
    public TicketWorker(String name) {
        super(name, "ticket worker");
    }

    public void sellTicket() {
        System.out.println(getName() + " esta vendiendo tickets :D");
    }

    public void refundTicket() {
        System.out.println(getName() + " esta reembolsando los tickets :'c");
    }

    public void checkTicketAvailability() {
        System.out.println(getName() + " esta revisando si hay tickets ;D");
    }
}

class StandWorker extends Employee implements ConcessionStandWorker{

    public StandWorker(String name) {
        super(name, "Stand worker");
    }

    public void serveSnack() {
        System.out.println(getName() + " esta sirviendo snacks ;D");
    }

    public void restockItems() {
        System.out.println(getName() + " esta colocando más snacks ;D");
    }

    public void processPayment() {
        System.out.println(getName() + " esta realizando el cobro de los snakcs ;3");
    }
}

class Principal {
	public static void main(String [] args) {
		MovieWorker worker1 = new MovieWorker("Jose Maria");
        worker1.checkProjectionStatus();
		worker1.startProjection();
        worker1.stopProjection();

		TicketWorker worker2 = new TicketWorker("Maria Jose");
        worker2.checkTicketAvailability();
        worker2.sellTicket();
        worker2.refundTicket();

        StandWorker worker3 = new StandWorker("Monica");
        worker3.restockItems();
        worker3.serveSnack();
        worker3.processPayment();
	}
}