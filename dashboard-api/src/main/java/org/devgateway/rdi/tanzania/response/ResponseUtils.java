package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.Ward;

/**
 * @author Sebastian Dimunzio
 */

public class ResponseUtils {


    public static FacilityResponse facilityToResponse(Facility facility) {
        if (facility != null) {
            FacilityResponse facilityResponse = new FacilityResponse();
            facilityResponse.setId(facility.getId());
            facilityResponse.setCode(facility.getCode());
            facilityResponse.setName(facility.getName());

            facilityResponse.setType(facility.getType());
            facilityResponse.setDetailedType(facility.getDetailedType());

            facilityResponse.setOwnership(facility.getOwnership());
            facilityResponse.setDetailedOwnership(facility.getDetailedOwnership());

            facilityResponse.setWard(new BoundaryResponse(facility.getWard().getGid(), facility.getWard().getName()));
            if (facility.getWard() != null && facility.getWard().getDistrict() != null) {
                facilityResponse.setDistrict(new BoundaryResponse(facility.getWard().getDistrict().getGid(), facility.getWard().getDistrict().getName()));
            }
            if (facility.getWard() != null && facility.getWard().getDistrict() != null && facility.getWard().getDistrict().getRegion() != null) {
                facilityResponse.setRegion(new BoundaryResponse(facility.getWard().getDistrict().getRegion().getGid(), facility.getWard().getDistrict().getRegion().getName()));

            }

            facilityResponse.setCoordinates(new Double[]{facility.getPoint().getCoordinate().x, facility.getPoint().getCoordinate().y});
            facilityResponse.setPoint(facility.getPoint());
            return facilityResponse;
        } else {
            return null;
        }
    }

    public static WardResponse wardToResponse(Ward ward) {
        if (ward != null) {
            WardResponse wardResponse = new WardResponse();
            wardResponse.setGid(ward.getGid());
            wardResponse.setName(ward.getName());
            wardResponse.setDistrict(new BoundaryResponse(ward.getDistrict().getGid(), ward.getDistrict().getName()));
            wardResponse.setRegion(new BoundaryResponse(ward.getDistrict().getRegion().getGid(), ward.getDistrict().getRegion().getName()));
            return wardResponse;
        } else {
            return null;
        }
    }
}
