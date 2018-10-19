package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author Sebastian Dimunzio
 */
@Repository
public interface WardRepository extends JpaRepository<Ward, Long>, WardRepositoryCustom {

    @EntityGraph(value = "facilityJoin", type = EntityGraph.EntityGraphType.FETCH)
    Set<Ward> findByDistrict(District district);

    @Query("select w from Ward w where upper(w.name) like upper(?1) order by name")
    List<Ward> findByName(String name);


}

