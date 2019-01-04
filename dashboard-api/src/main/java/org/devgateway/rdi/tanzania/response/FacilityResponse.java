package org.devgateway.rdi.tanzania.response;

import com.vividsolutions.jts.geom.Point;
import org.devgateway.rdi.tanzania.domain.Item;

/**
 * @author Sebastian Dimunzio
 */

public class FacilityResponse {

    private Long id;

    private String name;

    private String code;

    private Double[] coordinates;

    private Item ownership;

    private Item type;

    private Item detailedOwnership;

    private Item detailedType;

    private BoundaryResponse ward;

    private BoundaryResponse district;

    private BoundaryResponse region;

    private Point point;

    private String facilityType;
    private String boundaryLevel;


    public String getFacilityType() {
        return facilityType;
    }

    public void setFacilityType(String facilityType) {
        this.facilityType = facilityType;
    }

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Item getOwnership() {
        return ownership;
    }

    public void setOwnership(Item ownership) {
        this.ownership = ownership;
    }

    public Item getType() {
        return type;
    }

    public void setType(Item type) {
        this.type = type;
    }

    public Item getDetailedOwnership() {
        return detailedOwnership;
    }

    public void setDetailedOwnership(Item detailedOwnership) {
        this.detailedOwnership = detailedOwnership;
    }

    public Item getDetailedType() {
        return detailedType;
    }

    public void setDetailedType(Item detailedType) {
        this.detailedType = detailedType;
    }

    public BoundaryResponse getWard() {
        return ward;
    }

    public void setWard(BoundaryResponse ward) {
        this.ward = ward;
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

    public Double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(Double[] coordinates) {
        this.coordinates = coordinates;
    }

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public String getBoundaryLevel() {
        return boundaryLevel;
    }

    public void setBoundaryLevel(String boundaryLevel) {
        this.boundaryLevel = boundaryLevel;
    }
}
