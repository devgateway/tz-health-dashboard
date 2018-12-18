package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Item;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class OPDByAgeResponse {

    private DataElement diagnostic;
    private Integer year;
    private Integer quarter;
    private Integer month;
    private List<AgeValue> values = new ArrayList<>();
    private Long total = 0L;

    public List<AgeValue> getValues() {
        return values;
    }

    public List<OPDByAgeResponse> prevValues;

    public void setValues(List<AgeValue> values) {
        this.values = values;
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

    public void addValue(Item age, Long value) {
        this.total += value;
        this.values.add(new AgeValue(age, value));
    }


    public class AgeValue {
        private Item age;
        private Long value;

        public AgeValue(Item age, Long value) {
            this.age = age;
            this.value = value;
        }

        public Item getAge() {
            return age;
        }

        public void setAge(Item age) {
            this.age = age;
        }

        public Long getValue() {
            return value;
        }

        public void setValue(Long value) {
            this.value = value;
        }
    }

    public List<OPDByAgeResponse> getPrevValues() {
        return prevValues;
    }

    public void setPrevValues(List<OPDByAgeResponse> prevValues) {
        this.prevValues = prevValues;
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

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
