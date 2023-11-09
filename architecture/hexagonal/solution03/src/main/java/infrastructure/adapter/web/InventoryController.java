package main.java.infrastructure.adapter.web;

import main.java.application.model.Inventory;
import main.java.application.model.Order;
import main.java.application.ports.in.InventoryService;

//@RestController
//@RequestMapping("/inventory")


public class InventoryController {
    
    private final InventoryService inventoryService;

    public OrderController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

   // @PostMapping
    public ResponseEntity<Void> createOrder(@RequestBody Order order) {
        inventoryService.createOrder(order);
        return ResponseEntity.ok().build();
    }

   // @GetMapping
    public ResponseEntity<List<Order>> listOrders() {
        return ResponseEntity.ok(inventoryService.listOrders());
    }
}
