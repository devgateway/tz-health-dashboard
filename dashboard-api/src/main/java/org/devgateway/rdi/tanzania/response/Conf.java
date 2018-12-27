package org.devgateway.rdi.tanzania.response;

import org.devgateway.rdi.tanzania.domain.Dimension;
import org.devgateway.rdi.tanzania.domain.Item;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

public class Conf {

    List<Item> detailedTypes;
    ArrayList<Integer> years;

    public ArrayList<Integer> getYears() {
        return years;
    }

    public void setYears(ArrayList<Integer> years) {
        this.years = years;
    }

    public List<Item> getDetailedTypes() {
        return detailedTypes;
    }

    public void setDetailedTypes(List<Item> detailedTypes) {
        this.detailedTypes = detailedTypes;
    }
}
