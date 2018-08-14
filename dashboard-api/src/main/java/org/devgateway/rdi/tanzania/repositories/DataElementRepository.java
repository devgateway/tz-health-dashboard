package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */
public interface DataElementRepository extends JpaRepository<DataElement, Long> {

    DataElement findOneByDhis2Id(String dId);

}
