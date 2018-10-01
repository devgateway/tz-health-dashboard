package org.devgateway.rdi.tanzania.dhis.pojo;

/**
 * @author Sebastian Dimunzio
 */

public class Translation {
    String property;
    String locale;
    String value;

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
