package com.upb.admin.services;

import com.upb.admin.entity.ItemEntity;
import com.upb.admin.entity.UserEntity;
import com.upb.admin.models.Item;
import com.upb.admin.repository.ItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Item save(Item item) {
        if(item.getId() == null){
            item.setId(UUID.randomUUID().toString());
        }
        ItemEntity entity = new ItemEntity();
        BeanUtils.copyProperties(item, entity);
        itemRepository.save(entity);
        return item;
    }

    @Override
    public Item getItemById(String id) {
        return null;
    }

    @Override
    public List<Item> getItems() {
        return null;
    }

    @Override
    public Item deleteItem(String id) {
        return null;
    }
}
