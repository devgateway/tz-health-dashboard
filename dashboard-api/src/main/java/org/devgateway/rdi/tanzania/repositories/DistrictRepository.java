package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Repository
public interface DistrictRepository extends JpaRepository<District, Long>, DistrictRepositoryCustom {


    @Query("Select d from District d where d.name like:name")
    List<District> findByName(@Param("name") String name);

    @EntityGraph(value = "wardsJoin" , type= EntityGraph.EntityGraphType.FETCH)
    List<District> findByRegion(Region region);


}

