package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.orgs.Dhis2Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public interface DimensionRepository extends JpaRepository<Dhis2Item, Long> {


    List<Dhis2Item> findByDhis2Id(String dhis2Id);


}

