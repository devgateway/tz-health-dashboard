package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.ColumnResult;
import javax.persistence.SqlResultSetMapping;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Repository


public interface ServiceAreaPopulationRepository extends JpaRepository<ServiceAreaPopulation, Long>, ServiceAreaPopulationRepositoryCustom {

    List<ServiceAreaPopulation> findByFacilityAndYear(Facility f, Integer year);

}
