package main.java.application.ports.in;
import main.java.application.model.Book;
import main.java.application.model.Order;
import java.util.List;


public interface BookService {
    void createOrder(Book order);
    List<Order> listOrders();
}