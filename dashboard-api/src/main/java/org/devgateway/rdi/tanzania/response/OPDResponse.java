package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Item;

/**
 * @author Sebastian Dimunzio
 */

public class OPDResponse {


    private DataElement diagnostic;

    private Item age;

    private Integer year;

    private Long value;

    public OPDResponse() {
    }

    public OPDResponse(DataElement diagnostic, Item age, Integer year, Long value) {
        this.diagnostic = diagnostic;
        this.age = age;
        this.year = year;
        this.value = value;
    }


    public DataElement getDiagnostic() {
        return diagnostic;
    }

    public void setDiagnostic(DataElement diagnostic) {
        this.diagnostic = diagnostic;
    }

    public Item getAge() {
        return age;
    }

    public void setAge(Item age) {
        this.age = age;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }
}
