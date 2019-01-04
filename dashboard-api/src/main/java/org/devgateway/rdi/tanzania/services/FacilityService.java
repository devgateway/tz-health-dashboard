package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.FacilityGroup;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.repositories.FacilityGroupRepository;
import org.devgateway.rdi.tanzania.repositories.FacilityRepository;
import org.devgateway.rdi.tanzania.repositories.FacilitySpecifications;
import org.devgateway.rdi.tanzania.request.FacilityRequest;
import org.devgateway.rdi.tanzania.response.FacilityResponse;
import org.devgateway.rdi.tanzania.response.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class FacilityService {

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;

    public List<FacilityResponse> getFacilities(FacilityRequest facilityRequest) {
        List<Facility> facilities = facilityRepository.findAll(FacilitySpecifications.facilityFilters(facilityRequest));

        /*  Regional Referral Hospital -    HOSPITAL        - REGIONAL
            Health Labs District Hospital - HOSPITAL        - DISTRICT
            National Hospital -             HOSPITAL        - REGIONAL
            Dispensary -                    DISPENSARY      - WARD
            Nursing Home -                  HEALTH CENTER   - DISTRICT
            Referral Hospital -             HOSPITAL        - REGIONAL
            Designated District Hospital -  HOSPITAL        - DISTRICT
            National Super Specialist Hospital - HOSPITAL - REGIONAL?
            Eye Clinic - CLINIC - DISTRICT
            Regional Hospital - HOSPITAL - REGIONAL
            Other Hospital - HOSPITAL - REGIONAL
            Zonal Super Specialist Hospital - HOSPITAL - REGIONAL?
            Dental Clinic - CLINIC - DISTRICT
            Other Clinic - CLINIC - DISTRICT
            Maternity Home - HEALTH CENTER - DISTRICT?
            Health Center - HEALTH CENTER - DISTRICT?
        */


        return facilities.stream().map(f -> ResponseUtils.facilityToResponse(f)).collect(Collectors.toList());

    }

    public Facility getFacility(Long id) {
        return facilityRepository.findOne(id);
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


    public List<Facility> getFacilityByWard(Ward ward) {
        if (ward == null) {
            return null;
        }

        return facilityRepository.findByWard(ward);
    }

    public void cleanFacilities() {
        facilityRepository.deleteAllInBatch();
    }

    public void cleanGroups() {
        facilityGroupRepository.deleteAll();
    }

}
