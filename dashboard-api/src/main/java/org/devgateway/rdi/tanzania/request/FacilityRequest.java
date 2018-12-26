package org.devgateway.rdi.tanzania.request;

import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class FacilityRequest {

    String keyWord;
    String lan = "en";

    List<Long> districts;
    List<Long> wards;
    List<Long> regions;
    List<Long> types;
    List<Long> detailedType;

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

    public String getKeyWord() {
        return keyWord;
    }

    public void setKeyWord(String keyWord) {
        this.keyWord = keyWord;
    }

    public List<Long> getRegions() {
        return regions;
    }

    public void setRegions(List<Long> regions) {
        this.regions = regions;
    }

    public List<Long> getTypes() {
        return types;
    }

    public void setTypes(List<Long> types) {
        this.types = types;
    }

    public String getLan() {
        return lan;
    }

    public void setLan(String lan) {
        this.lan = lan;
    }

    public List<Long> getDetailedType() {
        return detailedType;
    }

    public void setDetailedType(List<Long> detailedType) {
        this.detailedType = detailedType;
    }
}
