package org.devgateway.rdi.tanzania.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import java.util.Date;

/**
 * @author Sebastian Dimunzio
 */
@Entity
public class ImportLog {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @javax.persistence.Id
    Long id;

    Date startDate;
    Date endDate;
    @ManyToOne(targetEntity = Region.class)
    Region region;
    String data;
    Integer year;
    String status;
    Boolean incremental;
    String error;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getIncremental() {
        return incremental;
    }

    public void setIncremental(Boolean incremental) {
        this.incremental = incremental;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
