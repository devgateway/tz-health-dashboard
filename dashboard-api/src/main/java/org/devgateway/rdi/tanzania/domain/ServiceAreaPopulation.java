package org.devgateway.rdi.tanzania.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;

import javax.persistence.*;

/**
 * @author Sebastian Dimunzio
 */

@Entity


@SqlResultSetMapping(name = "deleteResult", columns = {@ColumnResult(name = "count")})

@NamedNativeQueries({
        @NamedNativeQuery(
                name = "deleteByRegionId",
                query = "DELETE FROM service_area_population s " +
                        " USING " +
                        " facility f ,boundary as ward , boundary as district, boundary as region " +
                        " where s.facility_id=f.id" +
                        " and f.ward_gid=ward.gid " +
                        " and ward.district_gid=district.gid " +
                        " and district.region_gid=region.gid " +
                        " and region.gid =? and s.year=?"
                , resultSetMapping = "deleteResult"
        )
})

public class ServiceAreaPopulation {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;

    @JsonIgnore
    @ManyToOne(targetEntity = Facility.class)
    private Facility facility;
    private Integer year;
    private Double value;

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
