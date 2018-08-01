package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.WardRepository;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class FacilityService {


    @Autowired
    WardRepository wardRepository;

    public List<Facility> getFacilities(FacilityRequest facilityRequest) {
       // return facilityRepository.findAll(FacilitySpecifications.facilityByWard(facilityRequest));
        return null;
    }
}
