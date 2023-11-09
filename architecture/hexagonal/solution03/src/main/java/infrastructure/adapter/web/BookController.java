package main.java.infrastructure.adapter.web;

import java.util.List;

import main.java.application.model.Order;
import main.java.application.ports.in.BookService;

//@RestController
//@RequestMapping("/books")


public class BookController {
    
    private final BookService bookService;

    public void OrderController(BookService bookService) {
        this.bookService = bookService;
    }

   // @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody Order order) {
        bookService.createOrder(order);
        return ResponseEntity.ok().build();
    }

   // @GetMapping
    public ResponseEntity<List<Order>> listOrders() {
        return ResponseEntity.ok(bookService.listOrders());
    }
}
