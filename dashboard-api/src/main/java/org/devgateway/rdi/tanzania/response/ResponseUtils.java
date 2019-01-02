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
            if (facility.getPoint() != null) {
                facilityResponse.setCoordinates(new Double[]{facility.getPoint().getCoordinate().x, facility.getPoint().getCoordinate().y});
                facilityResponse.setPoint(facility.getPoint());
            }



            if (facility.getDetailedType() != null) {
                switch (facility.getDetailedType().getDhis2Id()) {

                    case "xQDiGgEFknR": // "xQDiGgEFknR";"Eye Clinic"
                    case "LGk92i9DOFU": // "LGk92i9DOFU";"Dental Clinic"
                    case "AMbDPYNQ2ha": // "AMbDPYNQ2ha";"Other Clinic"
                        facilityResponse.setCombinedType("Clinic");
                        break;
                    case "DvJehvyBpEQ": // "DvJehvyBpEQ";"Dispensary"
                        facilityResponse.setCombinedType("Dispensary");
                        break;
                    case "FgLhM6ea9dS": // "FgLhM6ea9dS";"Health Center"
                    case "gJQCkKyX8ph": // "gJQCkKyX8ph";"Nursing Home"
                    case "gKAkwmPuTLz": // "gKAkwmPuTLz";"Maternity Home"
                        facilityResponse.setCombinedType("Health Center");
                        break;
                    case "O4hfhLGzu8H": // "O4hfhLGzu8H";"Regional Referral Hospital"
                    case "YUJl1RAk6Gt": // "YUJl1RAk6Gt";"Health Labs"
                    case "LdiS9jKDmYj": // "LdiS9jKDmYj";"District Hospital"
                    case "P9dlUDycTwP": // "P9dlUDycTwP";"National Hospital"
                    case "xlorplD1QwS": // "xlorplD1QwS";"Referral Hospital"
                    case "v4blQv4R67J": // "v4blQv4R67J";"Designated District Hospital"
                    case "rHjr1oAqSIS": // "rHjr1oAqSIS";"National Super Specialist Hospital"
                    case "Y6oYSbQE2Tp": // "Y6oYSbQE2Tp";"Regional Hospital"
                    case "tnz6uusQqSf": // "tnz6uusQqSf";"Other Hospital"
                    case "I326qTfkdwh": // "I326qTfkdwh";"Zonal Super Specialist Hospital"
                        facilityResponse.setCombinedType("Hospital");
                        break;
                    default:
                        facilityResponse.setCombinedType(null);

                }
            }
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
