package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.orgs.Dhis2Item;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Sebastian Dimunzio
 */

public interface CategoryRepository extends JpaRepository<Dhis2Item, Long> {
}
