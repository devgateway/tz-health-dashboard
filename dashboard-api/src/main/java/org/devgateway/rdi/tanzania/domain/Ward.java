package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Geometry;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Entity
@DiscriminatorValue("WARD")
public class Ward extends Boundary {


    @ManyToOne(targetEntity = District.class)
    District district;


    String division;
    String wardType;
    Long populationRural;
    Long populationRuralMale;
    Long populationRuralFemale;

    Long populationUrban;
    Long populationUrbanMale;
    Long populationUrbanFemale;

    Long pop;
    Long ruralFema;
    Double areakm2;
    Integer precision;
    Double popDen;
    String comments;


    @OneToMany(targetEntity = Facility.class, mappedBy = "ward")
    List<Facility> facilities;

    public Ward() {
    }

    public Ward(Long gid, Geometry geom, String name) {
        this.gid = gid;
        this.geom = geom;
        this.name = name;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public String getWardType() {
        return wardType;
    }

    public void setWardType(String wardType) {
        this.wardType = wardType;
    }

    public Long getPopulationRural() {
        return populationRural;
    }

    public void setPopulationRural(Long populationRural) {
        this.populationRural = populationRural;
    }

    public Long getPopulationRuralMale() {
        return populationRuralMale;
    }

    public void setPopulationRuralMale(Long populationRuralMale) {
        this.populationRuralMale = populationRuralMale;
    }

    public Long getPopulationUrban() {
        return populationUrban;
    }

    public void setPopulationUrban(Long populationUrban) {
        this.populationUrban = populationUrban;
    }

    public Long getPopulationUrbanMale() {
        return populationUrbanMale;
    }

    public void setPopulationUrbanMale(Long populationUrbanMale) {
        this.populationUrbanMale = populationUrbanMale;
    }

    public Long getPop() {
        return pop;
    }

    public void setPop(Long pop) {
        this.pop = pop;
    }

    public Long getRuralFema() {
        return ruralFema;
    }

    public void setRuralFema(Long ruralFema) {
        this.ruralFema = ruralFema;
    }

    public Double getAreakm2() {
        return areakm2;
    }

    public void setAreakm2(Double areakm2) {
        this.areakm2 = areakm2;
    }

    public Integer getPrecision() {
        return precision;
    }

    public void setPrecision(Integer precision) {
        this.precision = precision;
    }

    public Double getPopDen() {
        return popDen;
    }

    public void setPopDen(Double popDen) {
        this.popDen = popDen;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getPopulationRuralFemale() {
        return populationRuralFemale;
    }

    public void setPopulationRuralFemale(Long populationRuralFemale) {
        this.populationRuralFemale = populationRuralFemale;
    }

    public Long getPopulationUrbanFemale() {
        return populationUrbanFemale;
    }

    public void setPopulationUrbanFemale(Long populationUrbanFemale) {
        this.populationUrbanFemale = populationUrbanFemale;
    }

    public List<Facility> getFacilities() {
        return facilities;
    }

    public void setFacilities(List<Facility> facilities) {
        this.facilities = facilities;
    }
}
