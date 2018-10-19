package org.devgateway.rdi.tanzania.response;

public class WardResponse extends BoundaryResponse{


    private BoundaryResponse district;

    private BoundaryResponse region;

    public WardResponse(Long id, String name) {
        super(id, name);
    }

    public WardResponse() {
        super();
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
