package org.devgateway.rdi.tanzania.controllers;

/**
 * @author Sebastian Dimunzio
 */

import org.devgateway.rdi.tanzania.domain.District;
import org.devgateway.rdi.tanzania.domain.Region;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.request.BoundaryRequest;
import org.devgateway.rdi.tanzania.services.BoundaryService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.geojson.FeatureCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("http://localhost:3000")
public class BoundaryController {

    @Autowired
    private BoundaryService boundaryService;

    @Autowired
    private WardService wardService;


    @RequestMapping("/regions")
    public FeatureCollection getRegions(BoundaryRequest boundaryRequest) {
        return boundaryService.findRegions(boundaryRequest);
    }

    @RequestMapping("/regions/{id}")
    public Region getRegion(@PathVariable Long id) {
        return boundaryService.getRegionById(id);
    }

    @RequestMapping("/districts")
    public FeatureCollection getDistrics(BoundaryRequest boundaryRequest) {
        return boundaryService.getDistricts(boundaryRequest);
    }

    @RequestMapping("/districts/{id}")
    public District getDistrict(@PathVariable Long id) {
        return boundaryService.getDistrictById(id);
    }

    @RequestMapping("/wards")
    public FeatureCollection getWards(BoundaryRequest boundaryRequest) {
        return boundaryService.getWards(boundaryRequest);
    }

    @RequestMapping("/ward/{id}")
    public Ward getWardById(@PathVariable Long id) {
        return boundaryService.getWardById(id);
    }


}
