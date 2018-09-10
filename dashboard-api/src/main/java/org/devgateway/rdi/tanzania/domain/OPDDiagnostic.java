package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class OPDDiagnostic {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;


    @ManyToOne(targetEntity = Facility.class)
    private Facility facility;

    @ManyToOne(targetEntity = DataElement.class)
    private DataElement diagnostic;

    @ManyToOne(targetEntity = Item.class)
    private Item age;

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

    public DataElement getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(DataElement diagnostic) {
        this.diagnostic = diagnostic;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
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

    public Item getAge() {
        return age;
    }

    public void setAge(Item age) {
        this.age = age;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

}
