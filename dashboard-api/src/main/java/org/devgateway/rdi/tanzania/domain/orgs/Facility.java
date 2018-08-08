package org.devgateway.rdi.tanzania.domain.orgs;

import com.vividsolutions.jts.geom.Point;
import org.devgateway.rdi.tanzania.domain.Ward;

import javax.persistence.*;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class Facility {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;


    String name;
    String code;

    Point point;

    String dhis2Id;

    String dhis2ParentId;


    @ManyToMany(targetEntity = FacilityGroup.class, cascade = CascadeType.MERGE)
    List<FacilityGroup> facilityGroups;

    @ManyToOne(targetEntity = Ward.class)
    private Ward ward;


    @ManyToOne(targetEntity = Item.class)
    private Item ownership;

    @ManyToOne(targetEntity = Item.class)
    private Item type;

    @ManyToOne(targetEntity = Item.class)
    private Item detailedOwnership;

    @ManyToOne(targetEntity = Item.class)
    private Item detailedType;

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

    public List<FacilityGroup> getFacilityGroups() {
        return facilityGroups;
    }

    public void setFacilityGroups(List<FacilityGroup> facilityGroups) {
        this.facilityGroups = facilityGroups;
    }

    public Ward getWard() {
        return ward;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
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
}
