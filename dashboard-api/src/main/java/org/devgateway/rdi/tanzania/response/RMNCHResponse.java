package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.DataElement;

/**
 * @author Sebastian Dimunzio
 */

public class RMNCHResponse {

    private DataElement indicator;

    private Integer year;

    private Integer quarter;

    private Integer month;

    private Long value;

    private Long totalPrevPeriod;

    public RMNCHResponse(DataElement indicator, Integer year, Long value) {
        this.indicator = indicator;
        this.year = year;
        this.value = value;
    }


    public RMNCHResponse(DataElement indicator, Integer year, Integer quarter, Long value) {
        this.indicator = indicator;
        this.year = year;
        this.quarter = quarter;
        this.value = value;
    }

    public RMNCHResponse(DataElement indicator, Integer year, Integer quarter, Integer month, Long value) {
        this.indicator = indicator;
        this.year = year;
        this.quarter = quarter;
        this.month = month;
        this.value = value;
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

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Long getTotalPrevPeriod() {
        return totalPrevPeriod;
    }

    public void setTotalPrevPeriod(Long totalPrevPeriod) {
        this.totalPrevPeriod = totalPrevPeriod;
    }
}
