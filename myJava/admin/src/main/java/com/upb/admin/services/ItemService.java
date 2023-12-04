package com.upb.admin.services;

import com.upb.admin.models.Item;
import com.upb.admin.models.User;

import java.util.List;

public interface ItemService {
    Item save(Item item);
    Item getItemById(String id);
    List<Item> getItems();
    Item deleteItem(String id);
}
