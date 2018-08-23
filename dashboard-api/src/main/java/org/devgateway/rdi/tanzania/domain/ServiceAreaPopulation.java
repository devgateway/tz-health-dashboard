package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class ServiceAreaPopulation {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = Facility.class)
    private Facility facility;
    private Integer year;
    private Double value;
    private String genderValue;
    private String ageValue;

    @ManyToOne(targetEntity = Item.class)
    Item gender;

    @ManyToOne(targetEntity = Item.class)
    Item age;

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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getGenderValue() {
        return genderValue;
    }

    public void setGenderValue(String genderValue) {
        this.genderValue = genderValue;
    }

    public String getAgeValue() {
        return ageValue;
    }

    public void setAgeValue(String ageValue) {
        this.ageValue = ageValue;
    }

    public Item getGender() {
        return gender;
    }

    public void setGender(Item gender) {
        this.gender = gender;
    }

    public Item getAge() {
        return age;
    }

    public void setAge(Item age) {
        this.age = age;
    }
}
