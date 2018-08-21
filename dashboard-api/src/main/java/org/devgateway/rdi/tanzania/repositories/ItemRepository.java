package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface ItemRepository extends JpaRepository<Item, Long> {


    Item findByDhis2Id(String dhis2Id);
}
