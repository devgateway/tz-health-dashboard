package org.devgateway.rdi.tanzania.dhis.analytics.results;

/**
 * @author Sebastian Dimunzio
 */

public class Header {

    String name;
    String column;
    String type;
    Boolean hiddenABoolean;
    Boolean meta;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getHiddenABoolean() {
        return hiddenABoolean;
    }

    public void setHiddenABoolean(Boolean hiddenABoolean) {
        this.hiddenABoolean = hiddenABoolean;
    }

    public Boolean getMeta() {
        return meta;
    }

    public void setMeta(Boolean meta) {
        this.meta = meta;
    }
}
