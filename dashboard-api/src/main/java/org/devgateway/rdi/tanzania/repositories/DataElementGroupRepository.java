package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.DataElementGroup;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */

public interface DataElementGroupRepository extends JpaRepository<DataElementGroup, Long> {

    @EntityGraph(value = "dataElementJoin" , type= EntityGraph.EntityGraphType.FETCH)
    DataElementGroup findOneByDhis2Id(String dhis2);

}
