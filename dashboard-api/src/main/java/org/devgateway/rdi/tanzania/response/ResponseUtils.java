package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.Facility;

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
            facilityResponse.setDistrict(new BoundaryResponse(facility.getWard().getDistrict().getGid(), facility.getWard().getDistrict().getName()));
            facilityResponse.setRegion(new BoundaryResponse(facility.getWard().getDistrict().getRegion().getGid(), facility.getWard().getDistrict().getRegion().getName()));
            facilityResponse.setCoordinates(new Double[]{facility.getPoint().getCoordinate().x, facility.getPoint().getCoordinate().y});

            return facilityResponse;
        } else {
            return null;
        }
    }
}
