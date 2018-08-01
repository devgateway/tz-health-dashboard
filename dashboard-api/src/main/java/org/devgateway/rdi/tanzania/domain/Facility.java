package org.devgateway.rdi.tanzania.domain;

import com.vividsolutions.jts.geom.Point;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Facility {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    private Long id;
    private String name;
    private String code;

    private Point point;

    private String dhis2Id;
    private String dhis2ParentId;


    @ManyToOne(targetEntity = Ward.class)
    private Ward ward;


    @ManyToOne(targetEntity = Ownership.class)
    private Ownership ownership;

    @ManyToOne(targetEntity = Type.class)
    private Type type;

    @ManyToOne(targetEntity = DetailedOwnership.class)
    private DetailedOwnership detailedOwnership;

    @ManyToOne(targetEntity = DetailedType.class)
    private DetailedType detailedType;

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

    public Point getPoint() {
        return point;
    }

    public void setPoint(Point point) {
        this.point = point;
    }

    public String getDhis2Id() {
        return dhis2Id;
    }

    public void setDhis2Id(String dhis2Id) {
        this.dhis2Id = dhis2Id;
    }

    public String getDhis2ParentId() {
        return dhis2ParentId;
    }

    public void setDhis2ParentId(String dhis2ParentId) {
        this.dhis2ParentId = dhis2ParentId;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public Ownership getOwnership() {
        return ownership;
    }

    public void setOwnership(Ownership ownership) {
        this.ownership = ownership;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public DetailedOwnership getDetailedOwnership() {
        return detailedOwnership;
    }

    public void setDetailedOwnership(DetailedOwnership detailedOwnership) {
        this.detailedOwnership = detailedOwnership;
    }

    public DetailedType getDetailedType() {
        return detailedType;
    }

    public void setDetailedType(DetailedType detailedType) {
        this.detailedType = detailedType;
    }
}
