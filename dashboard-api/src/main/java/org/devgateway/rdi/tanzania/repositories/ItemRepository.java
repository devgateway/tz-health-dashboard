package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Item;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface ItemRepository extends JpaRepository<Item, Long> {


    @Cacheable(cacheNames = "Item")
    Item findByDhis2Id(String dhis2Id);
}
