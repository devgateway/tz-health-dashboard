package org.devgateway.rdi.tanzania.request;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class BoundaryRequest {

    private List<String> types;

    private String q;

    private Long districtId;


    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public Double getSimplifyFactor() {
        return simplifyFactor;
    }

    public void setSimplifyFactor(Double simplifyFactor) {
        this.simplifyFactor = simplifyFactor;
    }

    private Double simplifyFactor = 0.005;

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }
}
