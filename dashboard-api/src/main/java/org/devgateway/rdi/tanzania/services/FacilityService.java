package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.FacilityGroup;
import org.devgateway.rdi.tanzania.repositories.FacilityGroupRepository;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.FacilitySpecifications;
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
    FacilityRepository facilityRepository;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;

    public List<Facility> getFacilities(FacilityRequest facilityRequest) {
        return facilityRepository.findAll(FacilitySpecifications.facilityByWard(facilityRequest));

    }

    public Facility getFacility(Long id) {
        return facilityRepository.getOne(id);

    }

    public Facility save(Facility f) {
        return facilityRepository.save(f);
    }


    public List<Facility> save(List<Facility> facilities) {
        return facilityRepository.save(facilities);
    }

    public List<FacilityGroup> saveGroups(List<FacilityGroup> groups) {
        return facilityGroupRepository.save(groups);
    }


    public void cleanFacilities(){
        facilityRepository.deleteAll();
    }

}
