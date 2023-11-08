class Item {
    private int stock;
    private String type;

    public Item(int stock, String type){
        this.stock = stock;
        this.type = type;
    }

    public int getStock(){
        return this.stock;
    }

    public String getType(){
        return this.type;
    }

    // Nuestra clase item obtendra el método sell 
    // para que de ese modo cualquier item de la tienda pueda ser vendido y no tendra que crear su propio metodo :D
    public void sell(int quantity){             
        if (stock >= quantity) {
            stock -= quantity;
            System.out.println(type + " vendido. Stock actualizado: " + stock);
        } else {
            System.out.println("Stock insuficiente para "+ type+"s.");
        }
    }
}

class Book extends Item{

    public Book(int stock) {
        super(stock, "Libro");
    }
    
}

class Game extends Item {

    public Game(int stock) {
        super(stock, "Juego");
    }
    
}

class Main {
    public static void main(String[] args){
        Book libro1 = new Book(100);
        libro1.sell(30);
        libro1.sell(40);

        Game juego1 = new Game(2);
        juego1.sell(10);
    }
}