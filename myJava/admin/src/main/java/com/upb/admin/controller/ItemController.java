package com.upb.admin.controller;

import com.upb.admin.models.Item;
import com.upb.admin.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {
    @Qualifier("itemServiceImpl")
    @Autowired
    private ItemService itemService;

    @PostMapping
    public Item save(@RequestBody Item item) {
        return itemService.save(item);
    }

    @GetMapping()
    public List<Item> getAll(){
        return itemService.getItems();
    }
    @GetMapping("/{id}")
    public Item getItemById(@PathVariable String id) {
        return itemService.getItemById(id);
    }

    @DeleteMapping("/{id}")
    public Item deleteItem(@PathVariable String id) {
        return itemService.deleteItem(id);
    }
}