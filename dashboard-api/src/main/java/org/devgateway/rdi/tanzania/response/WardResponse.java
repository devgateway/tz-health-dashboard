package org.devgateway.rdi.tanzania.response;

public class WardResponse {

    private Long id;

    private String name;

    private BoundaryResponse district;

    private BoundaryResponse region;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public BoundaryResponse getDistrict() {
        return district;
    }

    public void setDistrict(BoundaryResponse district) {
        this.district = district;
    }

    public BoundaryResponse getRegion() {
        return region;
    }

    public void setRegion(BoundaryResponse region) {
        this.region = region;
    }
}
