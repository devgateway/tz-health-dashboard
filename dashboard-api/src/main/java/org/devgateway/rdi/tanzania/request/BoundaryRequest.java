package org.devgateway.rdi.tanzania.request;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class BoundaryRequest {


    private String q;
    private List<Long> districts;
    private List<Long> wards;
    private List<Long> regions;

    private Double factor = 0.05;

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }




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

    public List<Long> getRegions() {
        return regions;
    }

    public void setRegions(List<Long> regions) {
        this.regions = regions;
    }

    public Double getFactor() {
        return factor;
    }

    public void setFactor(Double factor) {
        this.factor = factor;
    }
}
