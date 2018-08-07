package org.devgateway.rdi.tanzania.request;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class FacilityRequest {

    List<Long> districts;
    List<Long> wards;

    public List<Long> getDistricts() {
        return districts;
    }

    public void setDistricts(List<Long> districts) {
        this.districts = districts;
    }

    public List<Long> getWards() {
        return wards;
    }

    public void setWards(List<Long> wards) {
        this.wards = wards;
    }
}
