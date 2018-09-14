package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class RMNCH {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;

    @ManyToOne(targetEntity = Facility.class)
    private Facility facility;

    @ManyToOne(targetEntity = DataElement.class)
    private DataElement indicator;

    Integer year;

    Integer quarter;

    Integer month;

    Integer value;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }


    public DataElement getIndicator() {
        return indicator;
    }

    public void setIndicator(DataElement indicator) {
        this.indicator = indicator;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
