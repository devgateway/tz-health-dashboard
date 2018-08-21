package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.ServiceAreaPopulation;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.ServiceAreaPopulationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */


@Service
public class PopulationService {

    @Autowired
    ServiceAreaPopulationRepository serviceAreaPopulationRepository;

    @Autowired
    FacilityRepository facilityRepository;

    public List<ServiceAreaPopulation> getServiceAreaPopulation(Long id, Integer year) {
            Facility f = facilityRepository.findOne(id);
        if (f != null) {
            List<ServiceAreaPopulation> serviceAreaPopulations =
                    serviceAreaPopulationRepository.findByFacilityAndYear(f, year);
            return serviceAreaPopulations;
        }
        return null;
    }
}