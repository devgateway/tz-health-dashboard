package org.devgateway.rdi.tanzania.repositories;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Repository
public interface ServiceAreaPopulationRepository extends JpaRepository<org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation, Long> {


    List<ServiceAreaPopulation> findByFacilityAndYear(Facility f, Integer year);

}
