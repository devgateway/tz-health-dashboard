package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.RMNCHRepository;
import org.devgateway.rdi.tanzania.response.RMNCHResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class RMNCHService {

    @Autowired
    RMNCHRepository rmnchRepository;

    @Autowired
    FacilityRepository facilityRepository;

    public List<RMNCHResponse> getRMNCHbyPeriod(Long id, Integer year, Integer quarter, Integer month) {
        Facility f = facilityRepository.getOne(id);
        return rmnchRepository.getRMNCH(f, year, quarter, month);
    }


}
